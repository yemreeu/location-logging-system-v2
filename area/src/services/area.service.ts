import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from '../entities';
import { CreateAreaDto } from '../dto';
import { Location } from '../entities';


@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const area = this.areaRepository.create({
      ...createAreaDto,
      isActive: createAreaDto.isActive ?? true,
    });
    return this.areaRepository.save(area);
  }

  async findAll(): Promise<Area[]> {
    return this.areaRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findAllActive(): Promise<Area[]> {
    return this.areaRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Area> {
    const area = await this.areaRepository.findOne({ where: { id } });
    if (!area) {
      throw new NotFoundException(`Area with ID ${id} not found`);
    }
    return area;
  }

  async update(id: string, updateAreaDto: CreateAreaDto): Promise<Area> {
    const area = await this.findOne(id);
    Object.assign(area, updateAreaDto);
    return this.areaRepository.save(area);
  }

  async remove(id: string): Promise<void> {
    const area = await this.findOne(id);
    await this.areaRepository.remove(area);
  }

  async checkLocationInAreas(location: any) {
    const areas = await this.areaRepository.find();

    for (const area of areas) {
      if (
        this.isPointInPolygon(
          { lat: location.latitude, lng: location.longitude },
          area.boundaries,
        )
      ) {
        return true;
      }
    }
    return false
  }

  private isPointInPolygon(
    point: { lat: number; lng: number },
    polygon: any[],
  ): boolean {
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (
        polygon[i].lng > point.lng !== polygon[j].lng > point.lng &&
        point.lat <
          ((polygon[j].lat - polygon[i].lat) * (point.lng - polygon[i].lng)) /
            (polygon[j].lng - polygon[i].lng) +
            polygon[i].lat
      ) {
        return true;
      }
    }
    return false;
  }
}
