import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CityService } from '../city/city.service';

@Controller('user/')
export class UserController {
  constructor(private readonly cityService: CityService) {}

  @Get('join')
  async joinToServer(): Promise<any> {
    // return city
    const city = await this.cityService.getByUserId(1);
    if (!city) {
      return this.cityService.createCity();
    }
    return city;
    // return this.cityService.getCity(parseInt(userId), parseInt(id));
  }
}
