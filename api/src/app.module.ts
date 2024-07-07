import { Module } from '@nestjs/common';
import { BuildingModule } from './modules/building/building.module';
import { AppGateway } from './app.gateway';
import { MapModule } from './modules/map/map.module';
import { CityModule } from './modules/city/city.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [BuildingModule, MapModule, CityModule, UserModule],
  controllers: [],
  providers: [AppGateway],
  exports: [],
})
export class AppModule {}
