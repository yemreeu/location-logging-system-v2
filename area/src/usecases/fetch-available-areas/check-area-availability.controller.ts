import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { Location } from '../../entities';
import { AreaService } from 'src/services/area.service';
@Controller()
export class CheckAreaAvailibityController {
  constructor(
    @Inject('area-service')
    private readonly areaService: AreaService,
  ) {}

  @MessagePattern('area.areas.get')
  async checkLocationInAreas(@Payload() location: Location) {
    const result =  await this.areaService.checkLocationInAreas(location);
    return result;
  }
}