import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'prodcom_e2',
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js}'],
});
