import { HttpException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Address } from '@/Entity/address.entity';
import { ContactInfo } from '@/Entity/contactInfo.entity';
import { Product } from '@/product/entities/product.entity';
import { HttpStatus } from '@nestjs/common';
import { Payment, PaymentStatus } from '@/Entity/payment.entity';
import { DataSource, DeepPartial, In, Repository } from 'typeorm';
import {
  OrderResponseDto,
  OrderedItemsResponseDto,
} from './dto/create-order-response.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  PaymentInfo,
  UpdateOrderDto,
  UpdateOrderDtoForAdmin,
} from './dto/update-order.dto';
import { Order, StatusEnum } from './entities/order.entity';
import { OrderedItem } from './entities/orderedItems.entity';
import { TOrder, TOrderResponse } from './types/type';
import { TTokenPayload } from '@/auth/types/type';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
    @InjectRepository(Payment)
    private readonly PaymentRepository: Repository<Payment>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: TTokenPayload) {
    const { shipping_info, products } = createOrderDto;
    const productIds = products.map((product) => product.product_id);

    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        // ─── 1. Resolve Shipping Info (inside transaction) ───────────────────────

        let shippingInfo: Address;

        if (typeof shipping_info === 'number') {
          // Fix #5: throw a clear error when address ID is not found
          const existingAddress = await transactionalEntityManager
            .getRepository(Address)
            .findOne({ where: { id: shipping_info } });

          if (!existingAddress) {
            throw new HttpException(
              `Address with ID:${shipping_info} not found`,
              HttpStatus.NOT_FOUND,
            );
          }

          shippingInfo = existingAddress;
        } else {
          // Fix #3 & #4: properly save both new and existing contacts
          let contact = await transactionalEntityManager
            .getRepository(ContactInfo)
            .findOne({ where: { user: { id: user.userId } } });

          if (contact) {
            // Update both phone fields if provided; persist the changes
            contact.phone_one =
              shipping_info.contact.phone_one ?? contact.phone_one;
            contact.phone_two =
              shipping_info.contact.phone_two ?? contact.phone_two;
            contact = await transactionalEntityManager.save(
              ContactInfo,
              contact,
            );
          } else {
            // Fix #4: explicitly save the new contact before using it
            const newContact = transactionalEntityManager
              .getRepository(ContactInfo)
              .create({
                phone_one: shipping_info.contact.phone_one,
                phone_two: shipping_info.contact.phone_two ?? null,
                user: { id: user.userId },
              } as DeepPartial<ContactInfo>);

            contact = await transactionalEntityManager.save(
              ContactInfo,
              newContact,
            );
          }

          // Fix #2: address is now created and saved inside the transaction
          const newAddress = transactionalEntityManager
            .getRepository(Address)
            .create({
              address: shipping_info.address,
              city: shipping_info.city,
              country: shipping_info.country,
              postal_code: shipping_info.postal_code,
              contact,
              user: { id: user.userId },
            });

          shippingInfo = await transactionalEntityManager.save(
            Address,
            newAddress,
          );
        }

        // ─── 2. Fetch Products with Pessimistic Lock ──────────────────────────────
        // Step 1: lock the product rows only — no joins, no problem
        await transactionalEntityManager
          .getRepository(Product)
          .createQueryBuilder('product')
          .where('product.id IN (:...ids)', { ids: productIds })
          .setLock('pessimistic_write')
          .setOnLocked('nowait')
          .getMany();

        // Step 2: fetch the full product data with relations freely
        const lockedProductEntities = await transactionalEntityManager
          .getRepository(Product)
          .find({
            where: { id: In(productIds) },
            relations: { category: true },
          });

        // ─── 3. Validate Products and Stock ──────────────────────────────────────

        for (const product of products) {
          const productEntity = lockedProductEntities.find(
            (p) => p.id === product.product_id,
          );

          //  throw explicitly instead of silently skipping undefined entity
          if (!productEntity) {
            throw new HttpException(
              `Product with ID:${product.product_id} not found`,
              HttpStatus.BAD_REQUEST,
            );
          }

          if (productEntity.stock < product.quantity) {
            throw new HttpException(
              `Product with ID:${product.product_id} is out of stock`,
              HttpStatus.BAD_REQUEST,
            );
          }
        }

        // ─── 4. Calculate Totals ──────────────────────────────────────────────────

        //  single shared helper — no more duplicated formula
        const calcSubTotal = (
          productEntity: Product,
          quantity: number,
        ): number =>
          productEntity.price * (1 - productEntity.discount) * quantity;

        let total_price = 0;
        let total_items = 0;

        for (const product of products) {
          const productEntity = lockedProductEntities.find(
            (p) => p.id === product.product_id,
          )!;

          total_price += calcSubTotal(productEntity, product.quantity);
          total_items += product.quantity;
        }

        // ─── 5. Create and Persist Order ─────────────────────────────────────────

        // removed the confusing create([...])[0] pattern — use object form
        const newOrder = transactionalEntityManager
          .getRepository(Order)
          .create({
            user: { id: user.userId },
            shipping_info: shippingInfo,
            payment_info: undefined,
            probable_delivery_date: new Date(
              Date.now() + 3 * 24 * 60 * 60 * 1000,
            ),
          } as DeepPartial<Order>);

        const order = await transactionalEntityManager.save(Order, newOrder);

        // ─── 6. Create and Persist Ordered Items ─────────────────────────────────

        const items = products.map((product) => {
          const productEntity = lockedProductEntities.find(
            (p) => p.id === product.product_id,
          )!;

          return {
            product: productEntity,
            quantity: product.quantity,
            sub_total: calcSubTotal(productEntity, product.quantity),
            order,
          };
        });

        const orderedItems = transactionalEntityManager
          .getRepository(OrderedItem)
          .create(items);

        await transactionalEntityManager.save(OrderedItem, orderedItems);

        // ─── 7. Update Order Totals ───────────────────────────────────────────────

        // guard against undefined/null shipping_price to prevent NaN total
        const shipping_price = Number(order.shipping_price) || 0;

        order.items_price = total_price;
        order.total_items = total_items;
        order.total_price = total_price + shipping_price;

        await transactionalEntityManager.save(Order, order);

        // ─── 8. Decrement Product Stock ───────────────────────────────────────────

        for (const productEntity of lockedProductEntities) {
          const product = products.find(
            (p) => p.product_id === productEntity.id,
          );

          if (product) {
            productEntity.stock -= product.quantity;
            await transactionalEntityManager.save(Product, productEntity);
          }
        }

        // ─── 9. Return Response ───────────────────────────────────────────────────

        return {
          order: new OrderResponseDto(order),
          orderedItems: orderedItems.map(
            (item) => new OrderedItemsResponseDto(item),
          ),
        };
      },
    );
    //  dataSource.transaction() manages connect/commit/rollback/release
    // automatically — no manual queryRunner lifecycle needed
  }

  async findMyOrders(
    user: TTokenPayload,
    query: { page: number; limit: number },
  ) {
    const totalOrders = await this.OrderRepository.count({
      where: { user: { id: user.userId } },
    });

    const orders = await this.OrderRepository.find({
      where: { user: { id: user.userId } },
      relations: ['shipping_info', 'ordered_items', 'ordered_items.product'],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    let orderResponse: TOrderResponse = {
      totalOrders,
      orders: [],
    };
    for (const order of orders) {
      orderResponse.orders.push({
        id: order.id,
        itemsPrice: order.items_price,
        totalItems: order.total_items,
        totalPrice: order.total_price,
        shippingPrice: order.shipping_price,
        status: order.status,
        probableDeliveryDate: order.probable_delivery_date,
        deliveredAt: order.delivered_at,
        paymentInfo: order.payment_info
          ? {
              id: order.payment_info.id,
              status: order.payment_info.status,
              medium: order.payment_info.medium,
              amount: order.payment_info.amount,
              createdAt: order.payment_info.created_at,
            }
          : null,
        shippingInfo: {
          address: order.shipping_info.address,
          city: order.shipping_info.city,
          country: order.shipping_info.country,
          postalCode: order.shipping_info.postal_code,
          contact: {
            phoneOne: order.shipping_info.contact.phone_one,
            phoneTwo: order.shipping_info.contact.phone_two,
          },
        },
        orderedItems: order.ordered_items.map((item) => {
          return {
            productId: item.product.id,
            name: item.product.name,
            image: item.product.image_urls[0],
            price: item.product.price,
            discount: item.product.discount,
            quantity: item.quantity,
            subTotal: item.sub_total,
            category: item.product.category.category_name,
          };
        }),
        createdAt: order.created_at,
      });
    }
    return orderResponse;
  }

  async findMyOrder(id: number, user: TTokenPayload) {
    const order = await this.OrderRepository.findOne({
      where: { id, user: { id: user.userId } },
      relations: ['shipping_info', 'ordered_items', 'ordered_items.product'],
    });

    if (!order) {
      throw new HttpException(
        `There is no such order with ID:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const orderResponse: TOrder = {
      id: order.id,
      itemsPrice: order.items_price,
      totalItems: order.total_items,
      totalPrice: order.total_price,
      shippingPrice: order.shipping_price,
      status: order.status,
      probableDeliveryDate: order.probable_delivery_date,
      deliveredAt: order.delivered_at,
      paymentInfo: order.payment_info
        ? {
            id: order.payment_info.id,
            status: order.payment_info.status,
            medium: order.payment_info.medium,
            amount: order.payment_info.amount,
            createdAt: order.payment_info.created_at,
          }
        : null,
      createdAt: order.created_at,
      shippingInfo: {
        address: order.shipping_info.address,
        city: order.shipping_info.city,
        country: order.shipping_info.country,
        postalCode: order.shipping_info.postal_code,
        contact: {
          phoneOne: order.shipping_info.contact.phone_one,
          phoneTwo: order.shipping_info.contact.phone_two,
        },
      },
      orderedItems: order.ordered_items.map((item) => {
        return {
          productId: item.product.id,
          name: item.product.name,
          image: item.product.image_urls[0],
          price: item.product.price,
          discount: item.product.discount,
          quantity: item.quantity,
          subTotal: item.sub_total,
          category: item.product.category.category_name,
        };
      }),
    };

    return orderResponse;
  }

  async confirmOrCancelOrder(orderId: number, updateOrderDto: UpdateOrderDto) {
    let existedOrder = await this.OrderRepository.findOne({
      where: { id: orderId },
    });

    if (!existedOrder) {
      throw new HttpException(
        `There is no such order with ID:${orderId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (updateOrderDto.status === 'canceled') {
      existedOrder.status = updateOrderDto.status as StatusEnum;
      await this.OrderRepository.save(existedOrder);
      return { status: 'canceled' };
    }

    let payment;
    if (
      updateOrderDto.paymentStatus === 'paid' &&
      updateOrderDto.paymentInfo !== 'cod'
    ) {
      const { medium, transactionId, paidAt, amount } =
        updateOrderDto.paymentInfo as Required<PaymentInfo>;

      payment = this.PaymentRepository.create({
        medium,
        transaction_id: transactionId,
        paid_at: paidAt,
        amount,
        status: PaymentStatus.UNPAID,
      } as DeepPartial<Payment>);

      payment = await this.PaymentRepository.save(payment);
    } else {
      payment = this.PaymentRepository.create({
        medium: 'cod',
        status: PaymentStatus.UNPAID,
      } as DeepPartial<Payment>);
      payment = await this.PaymentRepository.save(payment);
    }

    existedOrder.payment_info = payment;
    existedOrder.status = updateOrderDto.status as StatusEnum;

    await this.OrderRepository.save(existedOrder);

    return { status: 'confirmed' };
  }

  async deleteMyOrder(orderId: number) {
    const order = await this.OrderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new HttpException(
        `There is no such order with ID:${orderId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (order.created_at < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      throw new HttpException(
        `You can not delete an order after 24 hours. please contact with our customer service`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.OrderRepository.delete(orderId);
    return;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    status: string | null,
    paymentStatus: string | null,
    sortBy: string | null,
    sortType: 'ASC' | 'DESC',
    searchTerm: string | null,
  ) {
    let orderQuery = this.OrderRepository.createQueryBuilder('order');

    if (status) {
      orderQuery = orderQuery.andWhere('order.status = :status', { status });
    }

    if (paymentStatus) {
      orderQuery = orderQuery.andWhere(
        'order.payment_info.status = :paymentStatus',
        { paymentStatus },
      );
    }

    if (searchTerm) {
      orderQuery = orderQuery.andWhere(
        'order.shipping_info.address LIKE :searchTerm OR order.shipping_info.city LIKE :searchTerm OR order.shipping_info.country LIKE :searchTerm OR order.shipping_info.postal_code LIKE :searchTerm OR order.shipping_info.contact.phone_one LIKE :searchTerm OR order.shipping_info.contact.phone_two LIKE :searchTerm',
        { searchTerm: `%${searchTerm}%` },
      );
    }

    // Validate sortBy against allowed fields to prevent SQL injection
    const validSortFields = [
      'id',
      'created_at',
      'status',
      'total_price',
      'updated_at',
    ];
    if (sortBy && sortType && validSortFields.includes(sortBy)) {
      orderQuery = orderQuery.orderBy(`order.${sortBy}`, sortType);
    } else {
      orderQuery = orderQuery.orderBy('order.created_at', 'DESC');
    }

    const orders = await orderQuery
      .leftJoinAndSelect('order.shipping_info', 'shipping_info')
      .leftJoinAndSelect('shipping_info.contact', 'contact')
      .leftJoinAndSelect('order.payment_info', 'payment_info')
      .leftJoinAndSelect('order.ordered_items', 'ordered_items')
      .leftJoinAndSelect('ordered_items.product', 'product')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalOrders = await this.OrderRepository.count();
    let orderResponse: TOrderResponse = {
      totalOrders,
      orders: [],
    };
    for (const order of orders) {
      orderResponse.orders.push({
        id: order.id,
        itemsPrice: order.items_price,
        totalItems: order.total_items,
        totalPrice: order.total_price,
        shippingPrice: order.shipping_price,
        status: order.status,
        createdAt: order.created_at,
        probableDeliveryDate: order.probable_delivery_date,
        deliveredAt: order.delivered_at,
        paymentInfo: order.payment_info
          ? {
              id: order.payment_info.id,
              status: order.payment_info.status,
              medium: order.payment_info.medium,
              amount: order.payment_info.amount,
              createdAt: order.payment_info.created_at,
            }
          : null,
        shippingInfo: {
          address: order.shipping_info.address,
          city: order.shipping_info.city,
          country: order.shipping_info.country,
          postalCode: order.shipping_info.postal_code,
          contact: {
            phoneOne: order.shipping_info.contact.phone_one,
            phoneTwo: order.shipping_info.contact.phone_two
              ? order.shipping_info.contact.phone_two
              : null,
          },
        },
        orderedItems: order.ordered_items.map((item) => {
          return {
            productId: item.product.id,
            name: item.product.name,
            image: item.product?.image_urls?.[0] ?? null,
            price: item.product.price,
            discount: item.product.discount,
            quantity: item.quantity,
            subTotal: item.sub_total,
            category: item.product.category?.category_name,
          };
        }),
      });
    }
    return orderResponse;
  }

  async updateOrderServiceByAdmin(
    orderId: number,
    updateOrderDto: UpdateOrderDtoForAdmin,
  ) {
    let existedOrder = await this.OrderRepository.findOne({
      where: { id: orderId },
    });

    if (!existedOrder) {
      throw new HttpException(
        `There is no such order with ID:${orderId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateOrderDto.status) {
      existedOrder.status = updateOrderDto.status as StatusEnum;
    }

    if (updateOrderDto.paymentStatus) {
      existedOrder.payment_info.status =
        updateOrderDto.paymentStatus as PaymentStatus;
    }

    if (updateOrderDto.probableDeliveryDate) {
      existedOrder.probable_delivery_date = updateOrderDto.probableDeliveryDate;
    }

    await this.OrderRepository.save(existedOrder);
    return { success: true, message: 'Order updated successfully' };
  }
}
