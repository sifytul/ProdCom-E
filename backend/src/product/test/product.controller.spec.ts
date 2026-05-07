import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { CategoryService } from '@/category/category.service';
import { TTokenPayload } from '@/auth/types/type';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  let categoryService: CategoryService;

  const mockProductService = {
    findAll: jest.fn(),
    findOneById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    softRemove: jest.fn(),
    getSoftRemovedProducts: jest.fn(),
    restore: jest.fn(),
    hardDelete: jest.fn(),
  };

  const mockCategoryService = {
    findCategoryByName: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, CategoryService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    productController = moduleRef.get<ProductController>(ProductController);
    productService = moduleRef.get<ProductService>(ProductService);
    categoryService = moduleRef.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('GET /products', () => {
    it('should return all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
      ];

      mockProductService.findAll.mockResolvedValue(mockProducts);

      const result = await productController.findAllProducts('all', 1, 10, 'desc', 'created_at', undefined);

      expect(result.success).toBe(true);
      expect(result.products).toBeDefined();
    });

    it('should filter products by category', async () => {
      const mockCategory = { id: 1, category_name: 'electronics' };
      const mockProducts = [{ id: 1, name: 'Phone', price: 500 }];

      mockCategoryService.findCategoryByName.mockResolvedValue(mockCategory);
      mockProductService.findAll.mockResolvedValue(mockProducts);

      const result = await productController.findAllProducts('electronics', 1, 10, 'desc', 'created_at', undefined);

      expect(result.success).toBe(true);
      expect(mockCategoryService.findCategoryByName).toHaveBeenCalledWith('electronics');
    });

    it('should return error for non-existent category', async () => {
      mockCategoryService.findCategoryByName.mockResolvedValue(null);

      const result = await productController.findAllProducts('nonexistent', 1, 10, 'desc', 'created_at', undefined);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Category not found');
    });
  });

  describe('GET /products/:id', () => {
    it('should return product by id', async () => {
      const mockProduct = { id: 1, name: 'Product 1', price: 100 };

      mockProductService.findOneById.mockResolvedValue(mockProduct);

      const result = await productController.findOneProductById(1);

      expect(result.success).toBe(true);
      expect(result.product).toEqual(mockProduct);
      expect(mockProductService.findOneById).toHaveBeenCalledWith(1);
    });

    it('should throw error for non-existent product', async () => {
      mockProductService.findOneById.mockResolvedValue(null);

      await expect(productController.findOneProductById(999)).rejects.toThrow('Product not found');
    });
  });

  describe('POST /admin/products/new', () => {
    it('should create a new product', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'admin@test.com',
        role: 'admin',
        tokenVersion: 0,
      };

      const mockCategory = { id: 1, category_name: 'electronics' };
      const productDto = {
        name: 'New Product',
        description: 'Description',
        price: 100,
        category: 'electronics',
      };

      mockCategoryService.findCategoryByName.mockResolvedValue(mockCategory);
      mockProductService.create.mockResolvedValue({ success: true });

      const result = await productController.createProduct(productDto, mockPayload);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Product created successfully');
    });

    it('should throw error for non-existent category', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'admin@test.com',
        role: 'admin',
        tokenVersion: 0,
      };

      const productDto = {
        name: 'New Product',
        description: 'Description',
        price: 100,
        category: 'nonexistent',
      };

      mockCategoryService.findCategoryByName.mockResolvedValue(null);

      await expect(productController.createProduct(productDto, mockPayload)).rejects.toThrow('Category not found');
    });
  });

  describe('PATCH /admin/products/:id', () => {
    it('should update product by id', async () => {
      const updatedProduct = { id: 1, name: 'Updated Product', price: 150 };

      mockProductService.update.mockResolvedValue(updatedProduct);

      const result = await productController.updateProductById(1, { name: 'Updated Product', price: 150 });

      expect(result.success).toBe(true);
      expect(result.updatedProduct).toEqual(updatedProduct);
    });
  });

  describe('DELETE /admin/products/:id (soft delete)', () => {
    it('should soft delete product', async () => {
      const mockProduct = { id: 1, name: 'Product 1', deletedAt: new Date() };

      mockProductService.softRemove.mockResolvedValue(mockProduct);

      const result = await productController.softRemoveProductById(1);

      expect(result.success).toBe(true);
      expect(result.softRemovedProduct).toBeDefined();
    });
  });

  describe('GET /admin/products/soft-deleted', () => {
    it('should return soft deleted products', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1', deletedAt: new Date() }];

      mockProductService.getSoftRemovedProducts.mockResolvedValue(mockProducts);

      const result = await productController.getSoftRemovedProducts();

      expect(result.success).toBe(true);
      expect(result.softRemovedProducts).toEqual(mockProducts);
    });
  });

  describe('PATCH /admin/products/:id/restore', () => {
    it('should restore soft deleted product', async () => {
      mockProductService.restore.mockResolvedValue({ affected: 1 });

      const result = await productController.restoreSoftRemovedProductById(1);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Product restored successfully');
    });

    it('should throw error if restore fails', async () => {
      mockProductService.restore.mockResolvedValue({ affected: 0 });

      await expect(productController.restoreSoftRemovedProductById(1)).rejects.toThrow('Product could not be restored');
    });
  });

  describe('DELETE /admin/products/:id/hard-delete', () => {
    it('should hard delete product', async () => {
      mockProductService.hardDelete.mockResolvedValue({ affected: 1 });

      const result = await productController.hardRemoveProductById(1);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Product deleted permanently');
    });

    it('should throw error if hard delete fails', async () => {
      mockProductService.hardDelete.mockResolvedValue(null);

      await expect(productController.hardRemoveProductById(1)).rejects.toThrow('Product could not be deleted');
    });
  });
});