import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { MapService } from './map.service';

@Controller('admin/map')
export class MapAdminController {
  constructor(private readonly mapService: MapService) {}

  @Get('generate')
  async generateMap(): Promise<any> {
    return this.mapService.generateMap();
  }
}
