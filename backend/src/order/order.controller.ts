import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
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

  @Patch('orders/my-orders/:id')
  async updateMyOrder(
    @Param('id') orderId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const updatedOrder = await this.orderService.confirmOrCancelOrder(
      orderId,
      updateOrderDto,
    );

    if (updatedOrder.status === 'canceled') {
      return {
        success: true,
        message: 'Order canceled successfully',
      };
    }

    return {
      success: true,
      message: 'Order updated successfully',
    };
  }

  @Delete('orders/my-orders/:id')
  async deleteMyOrder(@Param('id') orderId: number) {
    await this.orderService.deleteMyOrder(orderId);
    return {
      success: true,
      message: 'Order deleted successfully',
    };
  }

  @Roles(Role.ADMIN)
  @Get('admin/orders')
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status: string,
    @Query('paymentStatus') paymentStatus: string,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType: 'ASC' | 'DESC',
    @Query('searchTerm') searchTerm: string,
  ) {
    if (status === 'all') {
      status = null;
    }

    if (paymentStatus === 'all') {
      paymentStatus = null;
    }

    if (sortBy === 'none') {
      sortBy = null;
    }

    if (searchTerm === 'none') {
      searchTerm = null;
    }

    return this.orderService.findAll(
      page,
      limit,
      status,
      paymentStatus,
      sortBy,
      sortType,
      searchTerm,
    );
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
