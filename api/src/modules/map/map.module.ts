import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MapController } from './map.controller';
import { MapAdminController } from './map-admin.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MapController, MapAdminController],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
