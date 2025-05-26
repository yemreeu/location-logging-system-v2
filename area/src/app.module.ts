import { Module } from '@nestjs/common';
import config from './config';
import { ConfigModule } from '@nestjs/config';
import { AreaService } from './services/area.service';
import { CheckAreaAvailibityController } from './usecases/fetch-available-areas/check-area-availability.controller';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Area]),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
  controllers: [CheckAreaAvailibityController],
  providers: [
    {
      provide: 'area-service',
      useClass: AreaService,
    },
  ],
})
export class AppModule {}
