import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CityGeneratorService } from './city-generator.service';

@Injectable()
export class CityService {
  constructor(
    private prisma: PrismaService,
    private cityGenerator: CityGeneratorService,
  ) {}
  async getCity(id: number = 0) {
    // return { userId, id };
    return this.prisma.city.findFirst({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: number) {
    return this.prisma.city.findFirst({
      where: {
        id: 1, // change this to userId
      },
    });
  }

  async createCity() {
    const cities = await this.getAllCities();
    const { x, y } = await this.cityGenerator.findNewCityPosition(cities);
    return this.prisma.city.create({
      data: {
        name: 'My City',
        population: 0,
        x,
        y,
        max_store: 100,
        technology_age: 0,
        money: {
          create: {
            total: 100000,
            income: 0,
            outcome: 0,
            benefit: 0,
          },
        },
      },
    });
  }

  async getAllCities() {
    return this.prisma.city.findMany();
  }
}
