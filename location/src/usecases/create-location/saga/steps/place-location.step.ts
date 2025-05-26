import { Inject, Injectable } from '@nestjs/common';
import { Step } from './step';
import { Repository } from 'typeorm';
import { Location } from '../../../../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaceLocationStep extends Step<Location, void> {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {
    super();
    this.name = 'Place Location Step';
  }

  invoke(location: Location): Promise<void> {
    this.locationRepository.save(location);
    return Promise.resolve();
  }

  withCompenstation(location: Location): Promise<void> {
    return Promise.resolve();
  }
}