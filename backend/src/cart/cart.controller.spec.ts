import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TTokenPayload } from '@/auth/types/type';

describe('CartController', () => {
  let controller: CartController;
  let cartService: CartService;

  const mockCartService = {
    create: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService],
    })
      .overrideProvider(CartService)
      .useValue(mockCartService)
      .compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('PUT /carts/my-cart', () => {
    it('should create or update cart item', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      const mockCartDto = { productId: 1, quantity: 2 };
      const mockCreatedCart = { id: 1, quantity: 2, productId: 1 };

      mockCartService.create.mockResolvedValue(mockCreatedCart);

      const result = await controller.create(mockCartDto, mockPayload);

      expect(result).toBeDefined();
      expect(mockCartService.create).toHaveBeenCalledWith(mockCartDto, 1);
    });
  });

  describe('GET /carts/my-cart', () => {
    it('should return user cart', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      const mockCart = {
        id: 1,
        cartItems: [
          { id: 1, product: { id: 1, name: 'Product 1' }, quantity: 2 },
        ],
      };

      mockCartService.findOne.mockResolvedValue(mockCart);

      const result = await controller.findOne(mockPayload);

      expect(result.success).toBe(true);
      expect(result.cart).toBeDefined();
      expect(mockCartService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('DELETE /carts/my-cart/:cartItemId', () => {
    it('should remove item from cart', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      mockCartService.remove.mockResolvedValue({ success: true });

      const result = await controller.remove(1, mockPayload);

      expect(result).toBeDefined();
      expect(mockCartService.remove).toHaveBeenCalledWith(1, 1);
    });
  });
});