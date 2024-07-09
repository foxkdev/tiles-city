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
  }

  getGrid() {
    return [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ]
  }
  getGridRotated() {
    return [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ]
  }

  setRotation(rotation: number) {
    super.setRotation(rotation);
    if(rotation === 90 || rotation === 270) {
      this.position.x = this.position.x - 1.4;
      this.position.z = this.position.z + 1.4;
    }

  }
  // refreshView(map: Map) {
  //   const mesh = window.assetManager.getModel(`wallBricks`, this);

  //   this.setMesh(mesh);
  // }
}