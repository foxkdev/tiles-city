import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MapService } from '../map/map.service';
import { BuildingTypes } from './building-types';

interface BuildingInputArgs {
  x: number;
  y: number;
  type: string;
}
@Injectable()
export class BuildingService {
  constructor(
    private prisma: PrismaService,
    private mapService: MapService,
  ) {}

  async place(x: number, y: number, type: string): Promise<any> {
    if (!BuildingTypes[type]) {
      throw new Error('Invalid building type');
    }
    // const tileParent = await this.mapService.getTile({ x, y });
    // BuildingTypes[type].focus.forEach((tile) => {
    //   if (tile.x != 0 || tile.y != 0) {
    //     this.mapService.updateTile({
    //       x: x + tile.x,
    //       y: y + tile.y,
    //       type: 'PART_OF',
    //       parent: { connect: { x_y: { x, y } } },
    //     });
    //   }
    // });
    // return this.prisma.building.create({
    //   data: {
    //     x,
    //     y,
    //     type,
    //   },
    // });
    return this.mapService.updateTile({ x, y, type });
  }

  async delete(x: number, y: number): Promise<any> {
    return this.mapService.updateTile({ x, y, type: 'TERRAIN' });
  }
}
