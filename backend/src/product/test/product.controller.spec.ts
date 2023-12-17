import { Test } from '@nestjs/testing';
import { CategoryService } from '@/category/category.service';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { categoryStub } from './stubs/category.stub';
import { productPayloadStub, productStub } from './stubs/product.stub';

describe('ProductController', () => {
  let productController: ProductController;

  const mockProductService = {
    findAll: jest.fn().mockResolvedValue([productStub()]),
    create: jest.fn().mockResolvedValue({ success: true }),
  };

  const mockCategoryService = {
    findCategoryByName: jest.fn().mockResolvedValue(categoryStub()),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, CategoryService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    productController = moduleRef.get<ProductController>(ProductController);
  });

  describe('when we call findAllProducts method', () => {
    let response;
    beforeEach(async () => {
      response = await productController.findAllProducts(
        'phone',
        1,
        10,
        'desc',
        'created_at',
      );
    });
    it('should return an array of products', () => {
      expect(response).toEqual({
        success: true,
        products: [productStub()],
      });
    });
  });

  //-------------------------------------------------//

  describe('when we call createProduct method', () => {
    let response;
    let payload = productPayloadStub();
    beforeEach(async () => {
      response = await productController.createProduct(payload, 'user');
    });

    it('should return an object with success true', () => {
      expect(response).toEqual({
        success: true,
      });
    });
  });
});
