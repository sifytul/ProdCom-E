import { Test } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { productStub } from './stubs/product.stub';

describe('ProductController', () => {
  let productController: ProductController;

  const mockProductService = {
    findAll: jest.fn().mockResolvedValue([productStub()]),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    productController = moduleRef.get<ProductController>(ProductController);
  });

  describe('when we call findAllProducts method', () => {
    let response;
    beforeEach(async () => {
      response = await productController.findAllProducts();
    });
    it('should return an array of products', () => {
      expect(response).toEqual({
        success: true,
        products: [productStub()],
      });
    });
  });
});
