import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import { CityModule } from '../city/city.module';

@Module({
  imports: [PrismaModule, CityModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
