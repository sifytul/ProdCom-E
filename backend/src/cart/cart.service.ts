import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartItem } from './entities/cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,

    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createCartDto: CreateCartDto, userId: number) {
    const { productId, quantity } = createCartDto;

    const queryRunner = this.dataSource.createQueryRunner();
    const transactionResult = await queryRunner.manager.transaction(
      async (transactionalEntityManager) => {
        const cart = await this.cartItemRepository.find({
          where: { user: { id: userId } },
          relations: ['product'],
        });

        const productExist = cart.find(
          (cartItem) => cartItem.product.id === productId,
        );

        if (productExist) {
          productExist.quantity = quantity;
          await transactionalEntityManager.save(productExist);
          return { message: 'Product quantity updated' };
        } else {
          const cartItem = this.cartItemRepository.create({
            product: { id: productId },
            user: { id: userId },
            quantity,
          });
          await transactionalEntityManager.save(cartItem);
        }

        return { message: 'Product added to cart' };
      },
    );

    return transactionResult;
  }

  findOne(userId: number) {
    return this.cartItemRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  update(id: number) {
    return `This action updates a #${id} cart`;
  }

  async remove(userId: number, cartItemId: number) {
    const IscartItemExist = this.cartItemRepository.findOne({
      where: { id: cartItemId, user: { id: userId } },
    });

    if (!IscartItemExist) {
      return { message: 'Cart item not found' };
    }

    await this.cartItemRepository.delete(cartItemId);

    return { message: 'Cart item deleted' };
  }
}
