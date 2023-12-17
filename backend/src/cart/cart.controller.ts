import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { User } from '@/user/decorator/user.decorator';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('carts/my-cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Put()
  create(@Body() createCartDto: CreateCartDto, @User() user: any) {
    const { userId } = user;
    return this.cartService.create(createCartDto, userId);
  }

  @Get()
  async findOne(@User() user: any) {
    const { userId } = user;
    const cart = await this.cartService.findOne(userId);
    return {
      success: true,
      cart,
    };
  }

  @Delete(':cartItemId')
  remove(
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
    @User() user: any,
  ) {
    const { userId } = user;
    return this.cartService.remove(userId, cartItemId);
  }
}
