import * as THREE from 'three';
import { Building } from '../building';
import { Buildings } from "../../config/buildings";

export class WallBricks extends Building {
  modelName = 'wall_bricks';
  constructor() {
    super();
    this.name = 'wall_bricks';
    this.type = Buildings.WALL_BRICKS.id;
    this.hideTerrain = false;

    this.scale.set(2.1, 1.8, 1.8)
    this.position.set(1.5, 0, 0.1);

    this.grid = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ]
  }

  rotate() {
    this.grid = { x: this.grid.y, y: this.grid.x }
    this.rotation.y += Math.PI / 2;
  }

  // refreshView(map: Map) {
  //   const mesh = window.assetManager.getModel(`wallBricks`, this);

  //   this.setMesh(mesh);
  // }
}