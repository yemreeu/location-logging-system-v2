import { Location } from 'src/entities/location.entity';
import { Step } from './step';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import config from 'src/config';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable()
export class CheckAreaAvailibilityStep extends Step<Location, void> {
  constructor(
    @Inject(config().services.area.name)
    private areaClient: ClientKafka,
  ) {
    super();
    this.name = 'Check Area Availability Step';
  }

async invoke(location: Location): Promise<void> {
  const result = await lastValueFrom(
    this.areaClient.send('area.areas.get', location).pipe(timeout(10000)),
  );

  if (result !== 'true') {
    throw new Error('Location is not available');
  }
}

  withCompenstation(params: Location): Promise<any> {
    console.log('Compensating for failed location check:', params);
    return Promise.resolve();
  }

  async onModuleInit() {
    this.areaClient.subscribeToResponseOf('area.areas.get');
    await this.areaClient.connect();
  }
}