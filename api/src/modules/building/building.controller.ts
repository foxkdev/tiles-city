import { Body, Controller, Delete, Post } from '@nestjs/common';
import { BuildingService } from './building.service';

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  async placeBuilding(@Body() body): Promise<any> {
    return this.buildingService.place(body.x, body.y, body.type, body.rotation);
  }

  @Delete()
  async removeBuilding(@Body() body): Promise<any> {
    return this.buildingService.delete(body.x, body.y);
  }
}
