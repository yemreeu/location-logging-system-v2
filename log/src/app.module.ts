import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import config from './config';
import { LogService } from './services/log.service';
import { LogEnteredLocationController } from './usecases/log-entered-area/log-entered-location.controller';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaLog } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    DatabaseModule,
    TypeOrmModule.forFeature([AreaLog]),
  ],
  controllers: [LogEnteredLocationController],
  providers: [
    {
      provide: 'log-service',
      useClass: LogService,
    },
  ],
})
export class AppModule {}
