import { HttpException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Address } from '@/Entity/address.entity';
import { ContactInfo } from '@/Entity/contactInfo.entity';
import { Product } from '@/product/entities/product.entity';
// import { User } from '@/user/entity/user.entity';
import { HttpStatus } from '@nestjs/common';
import { Payment, PaymentStatus } from '@/Entity/payment.entity';
import { DataSource, DeepPartial, In, Repository } from 'typeorm';
import {
  OrderResponseDto,
  OrderedItemsResponseDto,
} from './dto/create-order-response.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderDtoForAdmin } from './dto/update-order.dto';
import { Order, StatusEnum } from './entities/order.entity';
import { OrderedItem } from './entities/orderedItems.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
    @InjectRepository(OrderedItem)
    private readonly OrderedItemRepository: Repository<OrderedItem>,
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
    @InjectRepository(Address)
    private readonly AddressRepository: Repository<Address>,
    @InjectRepository(ContactInfo)
    private readonly ContactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Payment)
    private readonly PaymentRepository: Repository<Payment>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: any) {
    const { shipping_info, products } = createOrderDto;

    const productIds = products.map((product) => product.product_id);

    const productEntities = await this.ProductRepository.find({
      where: { id: In(productIds) },
    });
    // check if the requested product is available

    let total_price = 0;
    let total_items = 0;
    for (const product of products) {
      const productEntity = productEntities.find(
        (productEntity) => productEntity.id === product.product_id,
      );
      if (!productEntity) {
        throw new HttpException(
          `Product with ID:${product.product_id} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (productEntity && productEntity.stock <= product.quantity) {
        throw new HttpException(
          `Product ${product.product_id} is out of stock`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        productEntity &&
        productEntity.stock &&
        productEntity.stock >= product.quantity
      ) {
        const sub_total =
          productEntity.price * (1 - productEntity.discount) * product.quantity;
        total_price += sub_total;
        total_items += product.quantity;
      }
    }

    let shippingInfo;
    let contact;
    // create contact info
    if (typeof shipping_info === 'number') {
      shippingInfo = this.AddressRepository.findOne({
        where: { id: shipping_info },
      });
    } else {
      contact = await this.ContactInfoRepository.findOne({
        where: { user: { id: user.userId } },
      });

      if (contact && shipping_info.contact.phone_two) {
        contact.phone_two = shipping_info.contact.phone_two;
        // await this.ContactInfoRepository.save(contact);
      }

      if (!contact) {
        let contactPayload = {
          phone_one: shipping_info.contact.phone_one,
          phone_two: shipping_info.contact.phone_two ?? null,
          user: { id: user.userId },
        };

        contact = this.ContactInfoRepository.create(contactPayload);
      }
      shippingInfo = this.AddressRepository.create({
        address: shipping_info.address,
        city: shipping_info.city,
        country: shipping_info.country,
        postal_code: shipping_info.postal_code,
        contact,
        user: { id: user.userId },
      });
    }

    shippingInfo = await this.AddressRepository.save(shippingInfo);

    // Start transaction
    const queryRunner = await this.dataSource.createQueryRunner();

    const transactionResult = await queryRunner.manager.transaction(
      async (transactionalEntityManager) => {
        // create an order instance with shipping info and user
        const newOrder = this.OrderRepository.create({
          user: { id: user.userId },
          payment_info: null,
          shipping_info: shippingInfo,
        });

        const order = await transactionalEntityManager.save(newOrder);

        // create ordered items with order instance and product instance
        let items = [];

        for (const product of products) {
          const productEntity = productEntities.find(
            (productEntity) => productEntity.id === product.product_id,
          );

          if (
            productEntity &&
            productEntity.stock &&
            productEntity.stock >= product.quantity
          ) {
            const sub_total =
              productEntity.price *
              (1 - productEntity.discount) *
              product.quantity;
            items.push({
              product: productEntity,
              quantity: product.quantity,
              sub_total,
              order,
            });
          }
        }

        const orderedItems = this.OrderedItemRepository.create(items);

        await transactionalEntityManager.save(orderedItems);

        // update order total price and total items
        order.items_price = total_price;
        order.total_items = total_items;
        order.total_price = Number(total_price) + Number(order.shipping_price);
        await transactionalEntityManager.save(order);

        // update product stock
        for (let productEntity of productEntities) {
          const product = products.find(
            (product) => product.product_id === productEntity.id,
          );

          if (product) {
            productEntity.stock -= product.quantity;
            await transactionalEntityManager.save(productEntity);
          }
        }
        return {
          order: new OrderResponseDto(order),
          orderedItems: orderedItems.map(
            (item) => new OrderedItemsResponseDto(item),
          ),
        };
      },
    );
    console.log('transactionResult: ', transactionResult);
    return transactionResult;
  }

  async findMyOrders(user: any) {
    const orders = await this.OrderRepository.find({
      where: { user: { id: user.userId } },
      relations: ['shipping_info', 'ordered_items', 'ordered_items.product'],
    });

    let orderResponse = [];
    for (const order of orders) {
      orderResponse.push({
        id: order.id,
        itemsPrice: order.items_price,
        totalItems: order.total_items,
        totalPrice: order.total_price,
        shippingPrice: order.shipping_price,
        status: order.status,
        probableDeliveryDate: order.probable_delivery_date,
        deliveredAt: order.delivered_at,
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
      });
    }
    return orderResponse;
  }

  async findMyOrder(id: number, user: any) {
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

    // return {
    //   id: order.id,
    //   itemsPrice: order.items_price,
    //   totalItems: order.total_items,
    //   totalPrice: order.total_price,
    //   shippingPrice: order.shipping_price,
    //   status: order.status,
    //   probableDeliveryDate: order.probable_delivery_date,
    //   deliveredAt: order.delivered_at,
    //   paymentInfo: order.payment_info.medium,
    //   shippingInfo: {
    //     address: order.shipping_info.address,
    //     city: order.shipping_info.city,
    //     country: order.shipping_info.country,
    //     postalCode: order.shipping_info.postal_code,
    //     contact: {
    //       phoneOne: order.shipping_info.contact.phone_one,
    //       phoneTwo: order.shipping_info.contact.phone_two,
    //     },
    //   },
    //   orderedItems: order.ordered_items.map((item) => {
    //     return {
    //       productId: item.product.id,
    //       name: item.product.name,
    //       image: item.product.image_urls[0] ?? null,
    //       price: item.product.price,
    //       discount: item.product.discount,
    //       quantity: item.quantity,
    //       subTotal: item.sub_total,
    //       category: item.product.category.category_name,
    //     };
    //   }),
    // };

    return order;
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
      const order = await this.OrderRepository.save(existedOrder);
      return { status: 'canceled' };
    }

    let payment;
    if (
      updateOrderDto.paymentStatus === 'paid' &&
      updateOrderDto.paymentInfo !== 'cod'
    ) {
      const { paymentInfo } = updateOrderDto;
      const { medium, transactionId, paidAt, amount } = paymentInfo;

      payment = await this.PaymentRepository.create({
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

    let order = await this.OrderRepository.save(existedOrder);

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
    status: string,
    paymentStatus: string,
    sortBy: string,
    sortType: 'ASC' | 'DESC',
    searchTerm: string,
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

    if (sortBy && sortType) {
      orderQuery = orderQuery.orderBy(`order.${sortBy}`, sortType);
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

    let orderResponse = [];
    for (const order of orders) {
      orderResponse.push({
        id: order.id,
        itemsPrice: order.items_price,
        totalItems: order.total_items,
        totalPrice: order.total_price,
        shippingPrice: order.shipping_price,
        status: order.status,
        probableDeliveryDate: order.probable_delivery_date,
        deliveredAt: order.delivered_at,
        paymentInfo: order.payment_info?.medium,
        shippingInfo: {
          address: order.shipping_info.address
            ? order.shipping_info.address
            : null,
          city: order.shipping_info.city ? order.shipping_info.city : null,
          country: order.shipping_info.country
            ? order.shipping_info.country
            : null,
          postalCode: order.shipping_info.postal_code
            ? order.shipping_info.postal_code
            : null,
          contact: {
            phoneOne: order.shipping_info.contact.phone_one
              ? order.shipping_info.contact.phone_one
              : null,
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
