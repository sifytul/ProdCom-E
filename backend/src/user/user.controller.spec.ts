import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserType } from './entity/user.entity';
import { TTokenPayload } from '@/auth/types/type';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    findOneByEmail: jest.fn(),
    findOneById: jest.fn(),
    updatePassword: jest.fn(),
    updateUser: jest.fn(),
    updateUserAvatar: jest.fn(),
    findAllUsers: jest.fn(),
    registerUser: jest.fn(),
    updateUserById: jest.fn(),
    deleteUserById: jest.fn(),
  };

  beforeEach(async () => {
    const userApp: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = userApp.get<UserController>(UserController);
    userService = userApp.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('GET /me', () => {
    const mockUser: any = {
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
      avatar_url: 'https://example.com/avatar.jpg',
      role: UserType.USER,
      createdAt: new Date(),
    };

    it('should return current user data for authenticated user', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: UserType.USER,
        tokenVersion: 0,
      };

      mockUserService.findOneByEmail.mockResolvedValue(mockUser);

      const result = await userController.me(mockPayload);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.email).toBe('test@test.com');
      expect(result.data.name).toBe('Test User');
      expect(mockUserService.findOneByEmail).toHaveBeenCalledWith('test@test.com');
    });

    it('should call findOneByEmail with correct email', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: UserType.USER,
        tokenVersion: 0,
      };

      mockUserService.findOneByEmail.mockResolvedValue({
        ...mockUser,
        email: mockPayload.email,
      });

      await userController.me(mockPayload);

      expect(mockUserService.findOneByEmail).toHaveBeenCalledWith('test@test.com');
    });
  });

  describe('PATCH /me/password/update', () => {
    it('should update password successfully', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: UserType.USER,
        tokenVersion: 0,
      };

      const passwordDto = {
        oldPassword: 'OldPassword123!',
        newPassword: 'NewPassword123!',
      };

      mockUserService.updatePassword.mockResolvedValue(true);

      const result = await userController.updateMyPassword(mockPayload, passwordDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Password successfully changed.');
      expect(mockUserService.updatePassword).toHaveBeenCalledWith(
        'test@test.com',
        passwordDto,
      );
    });
  });

  describe('PATCH /me/update', () => {
    it('should update user successfully', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: UserType.USER,
        tokenVersion: 0,
      };

      const updateDto = { name: 'Updated Name' };
      mockUserService.updateUser.mockResolvedValue(true);

      const result = await userController.updateMe(mockPayload, updateDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('User successfully updated.');
      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        'test@test.com',
        updateDto,
      );
    });
  });

  describe('GET /admin/users', () => {
    it('should return all users for admin', async () => {
      const mockUsers = {
        data: [
          { id: 1, name: 'Admin', email: 'admin@test.com', role: UserType.ADMIN },
          { id: 2, name: 'User', email: 'user@test.com', role: UserType.USER },
        ],
        total: 2,
        page: 1,
        limit: 10,
      };

      mockUserService.findAllUsers.mockResolvedValue(mockUsers);

      const result = await userController.getAllUsers();

      expect(result.success).toBe(true);
      expect(result.allUsers).toBeDefined();
      expect(result.allUsers.data).toHaveLength(2);
    });

    it('should support pagination parameters', async () => {
      mockUserService.findAllUsers.mockResolvedValue({
        data: [],
        total: 0,
        page: 2,
        limit: 5,
      });

      await userController.getAllUsers(2, 5);

      expect(mockUserService.findAllUsers).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
        sort_by: 'id',
        sort_type: 'ASC',
      });
    });
  });

  describe('POST /admin/users', () => {
    it('should create a new user as admin', async () => {
      const newUser = {
        id: 3,
        name: 'New User',
        email: 'new@test.com',
        role: UserType.USER,
      };

      mockUserService.registerUser.mockResolvedValue(newUser);

      const result = await userController.createUser({
        name: 'New User',
        email: 'new@test.com',
        password: 'Password123!',
      });

      expect(result.success).toBe(true);
      expect(result.newUser).toBeDefined();
      expect(result.newUser.email).toBe('new@test.com');
    });
  });

  describe('GET /admin/users/:id', () => {
    it('should return user by id for admin', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@test.com',
        role: UserType.USER,
      };

      mockUserService.findOneById.mockResolvedValue(mockUser);

      const result = await userController.getUserById(1);

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.id).toBe(1);
      expect(mockUserService.findOneById).toHaveBeenCalledWith(1);
    });
  });

  describe('PATCH /admin/users/:id', () => {
    it('should update user by id for admin', async () => {
      const updatedUser = {
        id: 1,
        name: 'Updated User',
        email: 'test@test.com',
        role: UserType.USER,
      };

      mockUserService.updateUserById.mockResolvedValue(updatedUser);

      const result = await userController.updateUserById(1, { name: 'Updated User' });

      expect(result.success).toBe(true);
      expect(result.updatedUser).toBeDefined();
      expect(result.updatedUser.name).toBe('Updated User');
      expect(mockUserService.updateUserById).toHaveBeenCalledWith(1, { name: 'Updated User' });
    });
  });

  describe('DELETE /admin/users/:id', () => {
    it('should delete user by id for admin', async () => {
      mockUserService.deleteUserById.mockResolvedValue(true);

      const result = await userController.deleteUserById(1);

      expect(result.success).toBe(true);
      expect(result.message).toBe('User with id 1 successfully deleted.');
      expect(mockUserService.deleteUserById).toHaveBeenCalledWith(1);
    });
  });
});