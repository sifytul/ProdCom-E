import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Address } from '@/Entity/address.entity';
import { ContactInfo } from '@/Entity/contactInfo.entity';
import { Order } from '@/order/entities/order.entity';
import { hashPassword } from '@/utils/hashPassword';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/upadte-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { deleteImage, uploadImage } from '@/utils/uploadImage';
import { TError, TFindAllUserQuery } from '@/types/type';
import { TRegisterProps } from '@/auth/types/type';

export type TUser = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepo: Repository<ContactInfo>,
  ) {}
  async registerUser({ name, email, password }: TRegisterProps) {
    const isUserExist = await this.findOneByEmail(email);
    let errors: TError[] = [];
    if (isUserExist) {
      errors.push({
        field: 'email',
        message: 'Email already in use.',
      });
      throw new ConflictException({
        status: 409,
        success: false,
        errors,
      });
    }
    const createdUser = this.userRepo.create({
      name,
      email,
      password: await hashPassword(password),
    });
    return await this.userRepo.save(createdUser);
  }

  async findOneByEmail(email: string): Promise<TUser | undefined> {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.email =  :email', { email: email })
      .addSelect('user.password')
      .getOne();
  }

  async findOneById(userId: number): Promise<TUser | undefined> {
    const address = await this.addressRepo.findOne({ where: { id: userId } });
    const orders = await this.orderRepo.find({ where: { id: userId } });
    const contactInfo = await this.contactInfoRepo.find({
      where: { id: userId },
    });
    const user = await this.userRepo.findOne({ where: { id: userId } });
    return {
      ...user,
      address,
      orders,
      contactInfo,
    };
  }

  async findAllUsers(query: TFindAllUserQuery) {
    let { page, limit, sort_type, sort_by } = query;

    const queryBuilder = this.userRepo.createQueryBuilder();

    if (sort_type && sort_by) {
      queryBuilder.orderBy(sort_by, sort_type);
    } else if (sort_by) {
      queryBuilder.orderBy(sort_by);
    } else if (sort_type) {
      queryBuilder.orderBy('id', sort_type);
    }

    if (page && page > 0) {
      queryBuilder.offset((page - 1) * limit);
    }

    if (limit) {
      queryBuilder.limit(limit);
    } else {
      queryBuilder.limit(10);
    }
    return queryBuilder.getMany();
  }

  async resetUserPassword(
    email: string,
    password: string,
    wantToLogOutFromOtherDevices: boolean,
  ) {
    let oldUserData = await this.findOneByEmail(email);

    oldUserData.password = await hashPassword(password);
    if (wantToLogOutFromOtherDevices) {
      oldUserData.tokenVersion += 1;
    }
    let updatedUser = await this.userRepo.save(oldUserData);
    delete updatedUser.password;
    return updatedUser;
  }

  async updatePassword(email: string, body: UpdatePasswordDto) {
    const existedUser = await this.findOneByEmail(email);
    let errors: TError[] = [];
    const hasMatch = await compare(body.oldPassword, existedUser?.password);
    if (!hasMatch) {
      errors.push({
        field: 'password',
        message: 'wrong old password',
      });
      throw new BadRequestException({
        success: false,
        errors,
      });
    }
    existedUser.password = await hashPassword(body.newPassword);
    if (body.wantToLogOutFromOtherDevices) {
      existedUser.tokenVersion += 1;
    }
    await this.userRepo.save(existedUser);
    return true;
  }

  async updateUser(email: string, body: UpdateUserDto) {
    const existingUser = await this.findOneByEmail(email);

    existingUser.name = body.name;
    return this.userRepo.save(existingUser);
  }

  async updateUserAvatar(email: string, avatar: Express.Multer.File) {
    const existingUser = await this.findOneByEmail(email);

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    let uploadedAvatar;

    if (avatar) {
      uploadedAvatar = await uploadImage(avatar);
    } else {
      uploadedAvatar = null;
    }
    if (!uploadedAvatar) {
      throw new BadRequestException('Please upload a valid image file.');
    }

    if (uploadedAvatar.error) {
      throw new BadRequestException(uploadedAvatar.error);
    }

    if (existingUser.avatar_public_id) {
      await deleteImage(existingUser.avatar_public_id);
    }
    existingUser.avatar_url = uploadedAvatar.url;
    existingUser.avatar_public_id = uploadedAvatar.public_id;
    await this.userRepo.save(existingUser);
    return {
      avatar_url: uploadedAvatar.url,
    };
  }
  async updateUserById(userId: number, body: UpdateUserDto) {
    const existingUser = await this.userRepo.findOne({ where: { id: userId } });

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    if (body && body.name) {
      existingUser.name = body.name;
    }

    if (body && body.role) {
      existingUser.role = body.role;
    }
    return this.userRepo.save(existingUser);
  }

  async deleteUserById(userId: number) {
    const existingUser = await this.userRepo.findOne({ where: { id: userId } });
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }
    return this.userRepo.remove(existingUser);
  }
}
