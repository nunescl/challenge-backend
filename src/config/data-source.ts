import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './environment-variables';

const development = env.NODE_ENV === 'development';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: development ? 'src/config/database/database.sqlite' : 'config/database/database.sqlite',
  synchronize: true,
  logging: false,
  entities: [
    development ? 'src/entities/**/*.entity.ts' : 'entities/**/*.entity.js',
  ],
});
