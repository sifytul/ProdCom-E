import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/user/decorator/user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('orders/new')
  async create(@Body() createOrderDto: CreateOrderDto, @User() user) {
    const createdOrder = await this.orderService.create(createOrderDto, user);
    return {
      success: true,
      message: 'Order created successfully',
      data: createdOrder,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('orders/my-orders')
  async findMyOrders(@User() user) {
    const orders = await this.orderService.findMyOrders(user);
    return {
      success: true,
      message: 'Orders fetched successfully',
      totalOrders: orders.length,
      data: orders,
    };
  }

  @Get('orders/my-orders/:id')
  async findMyOrder(@Param('id') id: number, @User() user) {
    const order = await this.orderService.findMyOrder(id, user);
    return {
      success: true,
      message: 'Order fetched successfully',
      data: order,
    };
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
