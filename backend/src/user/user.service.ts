import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { TRegisterProps } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

export type TUser = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async registerUser({ name, email, password }: TRegisterProps) {
    const isUserExist = await this.findOneByEmail(email);
    if (isUserExist) {
      throw new ConflictException('Email already in use.');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
    });
    return await this.userRepo.save(createdUser);
  }

  async findOneByEmail(email: string): Promise<TUser | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findAllUsers() {
    return this.userRepo.find({});
  }
}
