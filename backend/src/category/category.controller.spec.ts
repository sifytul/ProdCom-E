import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  const mockCategoryService = {
    findAll: jest.fn(),
    findCategoryByName: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /categories', () => {
    it('should return all categories', async () => {
      const mockCategories = [
        { id: 1, category_name: 'Electronics' },
        { id: 2, category_name: 'Clothing' },
      ];

      mockCategoryService.findAll.mockResolvedValue(mockCategories);

      const result = await controller.findAllCategories();

      expect(result.success).toBe(true);
      expect(result.categories).toEqual(mockCategories);
      expect(mockCategoryService.findAll).toHaveBeenCalled();
    });
  });

  describe('POST /admin/categories', () => {
    it('should create a new category', async () => {
      const categoryDto = { category_name: 'Electronics', description: 'Electronic products' };
      const mockCategory = { id: 1, ...categoryDto };

      mockCategoryService.findCategoryByName.mockResolvedValue(null);
      mockCategoryService.create.mockResolvedValue(mockCategory);

      const result = await controller.createCategory(categoryDto);

      expect(result.success).toBe(true);
      expect(result.category).toEqual(mockCategory);
    });

    it('should throw error for duplicate category', async () => {
      const categoryDto = { category_name: 'Electronics', description: 'Electronic products' };

      mockCategoryService.findCategoryByName.mockResolvedValue({ id: 1, category_name: 'Electronics' });

      await expect(controller.createCategory(categoryDto)).rejects.toThrow('Category already exists');
    });
  });

  describe('PATCH /admin/categories/:id', () => {
    it('should update category', async () => {
      const updateDto = { category_name: 'Updated Category' };
      const mockCategory = { id: 1, category_name: 'Updated Category' };

      mockCategoryService.update.mockResolvedValue(mockCategory);

      const result = await controller.updateCategory(1, updateDto);

      expect(result.success).toBe(true);
      expect(result.category).toEqual(mockCategory);
    });

    it('should throw error for no data to update', async () => {
      await expect(controller.updateCategory(1, {})).rejects.toThrow('No data to update');
    });

    it('should throw error for empty category name', async () => {
      await expect(controller.updateCategory(1, { category_name: '' })).rejects.toThrow('Category name cannot be empty');
    });

    it('should throw error for non-existent category', async () => {
      mockCategoryService.update.mockResolvedValue(null);

      await expect(controller.updateCategory(999, { category_name: 'Test' })).rejects.toThrow('Category not found');
    });
  });

  describe('DELETE /admin/categories/:id', () => {
    it('should delete category', async () => {
      const mockCategory = { id: 1, category_name: 'Electronics', image_public_id: 'img123' };

      mockCategoryService.remove.mockResolvedValue(mockCategory);

      const result = await controller.deleteCategory(1);

      expect(result.success).toBe(true);
      expect(result.category).toBeDefined();
    });

    it('should return error for non-existent category', async () => {
      mockCategoryService.remove.mockResolvedValue(null);

      const result = await controller.deleteCategory(999);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Category not found');
    });
  });

  describe('GET /admin/categories/:categoryName', () => {
    it('should return category by name', async () => {
      const mockCategory = { id: 1, category_name: 'Electronics' };

      mockCategoryService.findCategoryByName.mockResolvedValue(mockCategory);

      const result = await controller.findCategoryByName('Electronics');

      expect(result.success).toBe(true);
      expect(result.category).toEqual(mockCategory);
    });

    it('should throw error for non-existent category', async () => {
      mockCategoryService.findCategoryByName.mockResolvedValue(null);

      await expect(controller.findCategoryByName('NonExistent')).rejects.toThrow('Category not found');
    });
  });
});