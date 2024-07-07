import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MapService } from '../map/map.service';

type Position = { x: number; y: number };

const CITY_MIN_DISTANCE = 200;
const CITY_MAX_DISTANCE = 600;
@Injectable()
export class CityGeneratorService {
  constructor(
    private prisma: PrismaService,
    private mapService: MapService,
  ) {}

  async findNewCityPosition(cities: Position[]): Promise<Position> {
    let newCity: Position;
    const gridSize = await this.mapService.getMapSize();
    do {
      newCity = this.generateRandomPosition(gridSize);
    } while (!this.isValidPosition(newCity, cities));
    return newCity;
  }

  // Verifica si una posición es válida, es decir, está a una distancia segura de todas las ciudades existentes
  isValidPosition(newPos: Position, cities: Position[]): boolean {
    for (const city of cities) {
      const distance = this.calculateDistance(newPos, { x: city.x, y: city.y });
      if (distance < CITY_MIN_DISTANCE || distance > CITY_MAX_DISTANCE) {
        return false;
      }
    }
    return true;
  }
  // Calcula la distancia euclidiana entre dos puntos
  calculateDistance(p1: Position, p2: Position): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }
  // Genera una nueva posición aleatoria
  generateRandomPosition(gridSize: number): Position {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }
}
