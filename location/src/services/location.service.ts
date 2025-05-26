import { Inject, Injectable,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities';
import { CreateLocationDto } from '../usecases/create-location/dto';
import { CreateLocationSaga } from 'src/usecases/create-location/saga/create-location.saga';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @Inject('create-location-saga') private saga: CreateLocationSaga
  ) {}

  async createLocation(body: CreateLocationDto): Promise<void> {
    const location = await this.locationRepository.save(body);
    await this.saga.execute(location);
  }

  async findAll(userId?: string, limit = 100, offset = 0): Promise<Location[]> {
    const query = this.locationRepository.createQueryBuilder('location');
    
    if (userId) {
      query.where('location.userId = :userId', { userId });
    }
    
    return query
      .orderBy('location.createdAt', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
  }
}