import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import config from './config';
import { PlaceLocationStep } from './usecases/create-location/saga/steps/place-location.step';
import { LocationService } from './services/location.service';
import { CreateLocationSaga } from './usecases/create-location/saga/create-location.saga';
import { CreateLocationController } from './usecases/create-location/create-location.controller';
import { CheckAreaAvailibilityStep } from './usecases/create-location/saga/steps/check-area-availibility.step';
import { InsertLogStep } from './usecases/create-location/saga/steps/insert-log.step';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities';


@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Location]),
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: config().services.area.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config().services.location.clientId,
            brokers: [config().broker],
          },
          consumer: {
            groupId: config().services.area.groupId,
          },
        },
      },
      {
        name: config().services.log.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config().services.location.clientId,
            brokers: [config().broker],
          },
          consumer: {
            groupId: config().services.log.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [CreateLocationController],
  providers: [
    {
      provide: 'place-location-step',
      useClass: PlaceLocationStep,
    },
    {
      provide: 'check-area-availibity',
      useClass: CheckAreaAvailibilityStep,
    },
    {
      provide: 'insert-log',
      useClass: InsertLogStep,
    },
    {
      provide: 'create-location-saga',
      useClass: CreateLocationSaga,
    },
    {
      provide: 'location-service',
      useClass: LocationService,
    },
  ],
})
export class AppModule {}
