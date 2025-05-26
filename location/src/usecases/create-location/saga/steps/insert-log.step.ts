import { Step } from './step';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import config from 'src/config';
import { lastValueFrom, timeout } from 'rxjs';
import { Location } from '../../../../entities';
import { randomUUID } from 'crypto';

@Injectable()
export class InsertLogStep extends Step<Location, void> {
  constructor(
    @Inject(config().services.log.name)
    private logClient: ClientKafka,
  ) {
    super();
    this.name = 'Insert Log Step';
  }

  async invoke(location: Location): Promise<void> {
    const result = await lastValueFrom(
      this.logClient.send('location_entered_area', {
            userId: location.userId,
            areaId: randomUUID(),
            locationId: location.id,
            areaName: 'test area',
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: new Date(),
          }).pipe(timeout(10000)),
    );

    if (!result) {
      throw new Error('Location is not available');
    }
  }

  async withCompenstation(location: Location): Promise<void> {
    return Promise.resolve();
  }

  async onModuleInit() {
    this.logClient.subscribeToResponseOf('location_entered_area');
    await this.logClient.connect();
  }
}
