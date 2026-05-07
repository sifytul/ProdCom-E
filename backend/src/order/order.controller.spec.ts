import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TTokenPayload } from '@/auth/types/type';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  const mockOrderService = {
    create: jest.fn(),
    findMyOrders: jest.fn(),
    findMyOrder: jest.fn(),
    confirmOrCancelOrder: jest.fn(),
    deleteMyOrder: jest.fn(),
    findAll: jest.fn(),
    updateOrderServiceByAdmin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /orders/new', () => {
    it('should create a new order', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      const mockOrder = { id: 1, status: 'pending', total: 100 };
      const orderDto = { items: [{ productId: 1, quantity: 2 }] };

      mockOrderService.create.mockResolvedValue(mockOrder);

      const result = await controller.create(orderDto, mockPayload);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Order created successfully');
      expect(result.data).toEqual(mockOrder);
    });
  });

  describe('GET /orders/my-orders', () => {
    it('should return user orders', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      const mockOrders = {
        orders: [{ id: 1, status: 'pending' }],
        totalOrders: 1,
      };

      mockOrderService.findMyOrders.mockResolvedValue(mockOrders);

      const result = await controller.findMyOrders(mockPayload, 1, 10);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockOrders.orders);
      expect(result.totalOrders).toBe(1);
    });

    it('should support pagination', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      mockOrderService.findMyOrders.mockResolvedValue({ orders: [], totalOrders: 0 });

      await controller.findMyOrders(mockPayload, 2, 5);

      expect(mockOrderService.findMyOrders).toHaveBeenCalledWith(mockPayload, { page: 2, limit: 5 });
    });
  });

  describe('GET /orders/my-orders/:id', () => {
    it('should return specific order', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      const mockOrder = { id: 1, status: 'pending', total: 100 };

      mockOrderService.findMyOrder.mockResolvedValue(mockOrder);

      const result = await controller.findMyOrder(1, mockPayload);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockOrder);
    });
  });

  describe('PATCH /orders/my-orders/:id', () => {
    it('should confirm order', async () => {
      const mockOrder = { id: 1, status: 'confirmed' };

      mockOrderService.confirmOrCancelOrder.mockResolvedValue(mockOrder);

      const result = await controller.updateMyOrder(1, { status: 'confirmed' });

      expect(result.success).toBe(true);
      expect(result.message).toBe('Order confirmed successfully');
    });

    it('should cancel order', async () => {
      const mockOrder = { id: 1, status: 'canceled' };

      mockOrderService.confirmOrCancelOrder.mockResolvedValue(mockOrder);

      const result = await controller.updateMyOrder(1, { status: 'canceled' });

      expect(result.success).toBe(true);
      expect(result.message).toBe('Order canceled successfully');
    });
  });

  describe('DELETE /orders/my-orders/:id', () => {
    it('should delete user order', async () => {
      mockOrderService.deleteMyOrder.mockResolvedValue({ affected: 1 });

      const result = await controller.deleteMyOrder(1);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Order deleted successfully');
    });
  });

  describe('GET /admin/orders', () => {
    it('should return all orders for admin', async () => {
      const mockOrders = {
        orders: [{ id: 1, status: 'pending' }],
        total: 1,
      };

      mockOrderService.findAll.mockResolvedValue(mockOrders);

      const result = await controller.findAll();

      expect(result).toBeDefined();
    });

    it('should support status filter', async () => {
      mockOrderService.findAll.mockResolvedValue({ orders: [], total: 0 });

      await controller.findAll(1, 10, 'pending', null, null, 'ASC', null);

      expect(mockOrderService.findAll).toHaveBeenCalled();
    });
  });

  describe('PATCH /admin/orders/:id', () => {
    it('should update order by admin', async () => {
      const updatedOrder = { id: 1, status: 'shipped' };

      mockOrderService.updateOrderServiceByAdmin.mockResolvedValue(updatedOrder);

      const result = await controller.updateOrderByAdmin(1, { status: 'shipped' });

      expect(result).toBeDefined();
    });
  });
});