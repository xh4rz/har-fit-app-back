import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({
  path: `.env.${process.env.NODE_ENV}`,
});

export default new DataSource({
  ssl: process.env.NODE_ENV === 'production',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
});
