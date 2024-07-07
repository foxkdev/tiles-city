import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async getMap(@Query() query): Promise<any> {
    return this.mapService.getMap(
      parseInt(query.x),
      parseInt(query.y),
      parseInt(query.renderSize),
    );
  }
}
