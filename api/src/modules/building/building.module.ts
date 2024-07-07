import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MapModule } from '../map/map.module';
import { BuildingController } from './building.controller';

@Module({
  imports: [PrismaModule, MapModule],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}
