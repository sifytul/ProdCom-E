import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'prodCom_E',
  entities: [],
  synchronize: true,
  logging: true,
};
