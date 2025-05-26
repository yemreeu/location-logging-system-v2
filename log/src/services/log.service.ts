import { Inject, Injectable,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaLog } from '../entities';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(AreaLog)
    private areaLogRepository: Repository<AreaLog>,
  ) {}

  async createAreaLog(data: {
    userId: string;
    areaId: string;
    locationId: string;
    areaName?: string;
    latitude?: number;
    longitude?: number;
    timestamp?: Date;
  }): Promise<AreaLog> {
    const log = this.areaLogRepository.create({
      userId: data.userId,
      areaId: data.areaId,
      locationId: data.locationId,
      areaName: data.areaName,
      latitude: data.latitude,
      longitude: data.longitude,
      createdAt: data.timestamp || new Date(),
    });
    
    return this.areaLogRepository.save(log);
  }
}