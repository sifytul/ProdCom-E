import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TRegisterProps } from 'src/auth/auth.service';
import { hashPassword } from 'src/utils/hashPassword';
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
    const createdUser = this.userRepo.create({
      name,
      email,
      password: await hashPassword(password),
    });
    return await this.userRepo.save(createdUser);
  }

  async findOneByEmail(email: string): Promise<TUser | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findAllUsers() {
    return this.userRepo.find({});
  }

  async resetUserPassword(
    email: string,
    password: string,
    wantToLogOutFromOtherDevices: boolean,
  ) {
    let oldUserData = await this.findOneByEmail(email);

    oldUserData.password = password;
    if (wantToLogOutFromOtherDevices) {
      oldUserData.tokenVersion += 1;
    }
    let updatedUser = await this.userRepo.save(oldUserData);
    console.log(updatedUser);
    delete updatedUser.password;
    return updatedUser;
  }
}
