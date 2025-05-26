import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { LogService } from 'src/services/log.service';
@Controller()
export class LogEnteredLocationController {
  constructor(
    @Inject('log-service')
    private readonly logService: LogService,
  ) {}

  @MessagePattern('location_entered_area')
  async checkLocationInAreas(@Payload() data: {
    userId: string;
    areaId: string;
    locationId: string;
    areaName?: string;
    latitude?: number;
    longitude?: number;
    timestamp: Date;
  }) {
    return await this.logService.createAreaLog(data);
  }
}