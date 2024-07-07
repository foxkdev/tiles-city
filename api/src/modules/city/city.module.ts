import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MapModule } from '../map/map.module';
import { CityGeneratorService } from './city-generator.service';
import { CityController } from './city.controller';

@Module({
  imports: [PrismaModule, MapModule],
  controllers: [CityController],
  providers: [CityService, CityGeneratorService],
  exports: [CityService],
})
export class CityModule {}
