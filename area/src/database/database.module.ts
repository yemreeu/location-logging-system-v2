import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Area } from '../entities';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.AREA_DATABASE_NAME}`,
      entities: [Area],
      synchronize: false, // Use migrations in production
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
      logging: ['error'],
    }),
  ],
})
export class DatabaseModule {}
