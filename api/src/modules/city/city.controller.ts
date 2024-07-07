import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CityService } from './city.service';

@Controller('city/')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':id')
  async getCity(@Param('id') id: string): Promise<any> {
    return this.cityService.getCity(parseInt(id));
  }
}
