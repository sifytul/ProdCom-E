import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'prodcom_e',
  entities: [User, Product],
  synchronize: true,
  logging: true,
};
