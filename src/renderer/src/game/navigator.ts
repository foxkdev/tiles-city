import * as PF from "pathfinding";

import type { Tile } from "./buildings/map/tile";


export class Navigator {

  private static instance: Navigator | null = null;
  grid: PF.Grid;
  finder: PF.AStarFinder
  constructor(private map: Tile[]) {
    // this.grid = new PF.Grid(100, 100);
    this.grid = new PF.Grid(this.parseMapIntoMatrix());
    
    this.finder = new PF.AStarFinder({
      allowDiagonal: true,
    });
  }

  public static getInstance(map: Tile[]): Navigator {
    if(!this.instance) {
      this.instance = new Navigator(map)
    }
    return this.instance;
  }


  findPath(from: Tile, to: Tile) {
    return this.finder.findPath(from.x, from.y, to.x, to.y, this.grid)
  }


  private parseMapIntoMatrix() {
    const maxX = Math.max(...this.map.map(obj => obj.x));
    const maxY = Math.max(...this.map.map(obj => obj.y));
    const matrix = Array.from({ length: maxX + 1 }, () => Array(maxY + 1).fill(null));

    this.map.forEach(tile => {
      matrix[tile.x][tile.y] = 0; // check buuildings?
    })

    return matrix;
  }


}