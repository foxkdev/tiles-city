import { Injectable } from '@nestjs/common';
import { MapTile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const SIZE_MAP = 200;
const TREE_PERCENTAGE = 10;
@Injectable()
export class MapService {
  constructor(private prisma: PrismaService) {}
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
  async getAllBuildings(): Promise<string> {
    return 'All Buildings!';
  }
  async getFullMap(): Promise<MapTile[]> {
    return this.prisma.mapTile.findMany();
  }
  async getMap(x: number, y: number, renderSize: number): Promise<any> {
    const fullMap = await this.prisma.mapTile.findMany({
      include: {
        parent: true,
      },
      where: {
        x: {
          gte: x,
          lt: x + renderSize,
        },
        y: {
          gte: y,
          lt: y + renderSize,
        },
      },
    });
    const items = this.generateTrees(fullMap, renderSize);
    // const items = Array.from({ length: renderSize }, () =>
    //   Array(renderSize).fill(null),
    // );
    // for (const tile of fullMap) {
    //   items[tile.x][tile.y] = tile;
    // }
    // return items;
    return items;
  }

  async getTile({ x, y }: { x: number; y: number }): Promise<MapTile> {
    return this.prisma.mapTile.findUnique({
      where: {
        x_y: {
          x,
          y,
        },
      },
    });
  }
  async updateTile({
    x,
    y,
    type,
    parent,
    rotation,
  }: {
    x: number;
    y: number;
    type: string;
    parent?: { connect: any };
    rotation?: number;
  }): Promise<MapTile> {
    return this.prisma.mapTile.update({
      where: {
        x_y: {
          x,
          y,
        },
      },
      data: {
        type,
        parent,
        rotation,
      },
    });
  }

  async generateMap(): Promise<any> {
    const map = [];

    // generate grid map
    for (let x = 0; x < SIZE_MAP; x++) {
      map[x] = [];
      for (let y = 0; y < SIZE_MAP; y++) {
        let type = 'TERRAIN';
        if (x === 0 || y === 0 || x === SIZE_MAP - 1 || y === SIZE_MAP - 1) {
          type = 'WALL';
        }

        map[x][y] = {
          x,
          y,
          type,
        };
        try {
          await this.prisma.mapTile.create({
            data: {
              x,
              y,
              type,
            },
          });
        } catch (e) {
          console.log('ERROR', e);
        }
      }
    }
    console.log('GENERATED', map);
    return map;
  }

  generateTrees(map, size) {
    const totalCells = size * size;
    const totalTrees = Math.floor(totalCells * (TREE_PERCENTAGE / 100));

    const treePositions = new Set<number>();
    while (treePositions.size < totalTrees) {
      treePositions.add(Math.floor(Math.random() * totalCells));
    }

    treePositions.forEach((pos) => {
      map[pos].type = 'TREE';
    });

    return map;
  }

  async getMapSize(): Promise<number> {
    const size = await this.prisma.mapTile.count();
    return size / 2;
  }
}
