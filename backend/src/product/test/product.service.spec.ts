import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductService } from '../product.service';
import { productStub } from './stubs/product.stub';

describe('ProductService', () => {
  let service: ProductService;

  let mockProductRepository = {
    find: jest.fn().mockResolvedValue([productStub()]),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when we call findAll method', () => {
    let products;
    beforeEach(async () => {
      products = await service.findAll();
    });

    it('should call the find method of product repository', () => {
      expect(mockProductRepository.find).toHaveBeenCalled();
    });

    it('should return an array of products', () => {
      expect(products).toEqual([productStub()]);
    });
  });
});
