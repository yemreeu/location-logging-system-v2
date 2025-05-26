import {
  Body,
  Controller,
  GoneException,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateLocationDto } from './dto';
import { LocationService } from 'src/services/location.service';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class CreateLocationController {
  constructor(
    @Inject('location-service')
    private readonly service: LocationService,
  ) {}

  @ApiBody({
    schema: {
      example: {
        userId: '123e4567-e89b-12d3-a456-426614174000',
        latitude: 41.1612,
        longitude: 29.0292,
      },
    },
  })
  @Post('/locations')
  async createLocation(@Body() body: CreateLocationDto) {
    try {
      await this.service.createLocation(body);
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  }
}
