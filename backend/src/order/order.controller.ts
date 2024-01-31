import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Role, Roles } from '@/auth/decorators/roles.decorator';
import { User } from '@/user/decorator/user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderDtoForAdmin } from './dto/update-order.dto';
import { OrderService } from './order.service';
import { TTokenPayload } from '@/auth/types/type';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('orders/new')
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @User() user: TTokenPayload,
  ) {
    const createdOrder = await this.orderService.create(createOrderDto, user);
    return {
      success: true,
      message: 'Order created successfully',
      data: createdOrder,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('orders/my-orders')
  async findMyOrders(
    @User() user: TTokenPayload,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const orders = await this.orderService.findMyOrders(user, { page, limit });
    return {
      success: true,
      message: 'Orders fetched successfully',
      totalOrders: orders.totalOrders,
      currentPage: page,
      perPage: limit,
      totalPage: Math.ceil(orders.totalOrders / limit),
      data: orders.orders,
    };
  }

  @Get('orders/my-orders/:id')
  async findMyOrder(
    @Param('id', ParseIntPipe) id: number,
    @User() user: TTokenPayload,
  ) {
    if (id === null) {
      return {
        success: false,
        message: 'Order not found',
      };
    }
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
      message: 'Order confirmed successfully',
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
    @Query('status') status: string | null,
    @Query('paymentStatus') paymentStatus: string | null,
    @Query('sortBy') sortBy: string | null,
    @Query('sortType') sortType: 'ASC' | 'DESC',
    @Query('searchTerm') searchTerm: string | null,
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

  @Patch('/admin/orders/:id')
  updateOrderByAdmin(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDtoForAdmin,
  ) {
    return this.orderService.updateOrderServiceByAdmin(id, updateOrderDto);
  }
}
