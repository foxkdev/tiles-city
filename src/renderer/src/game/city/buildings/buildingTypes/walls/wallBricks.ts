import * as THREE from 'three';
import { Building } from '../../building';
import { BuildingType } from '../../buildingTypes/buildingType';

export class WallBricks extends Building {
  modelName = 'wall_bricks';
  constructor() {
    super();
    this.name = 'wall_bricks';
    this.type = BuildingType.WALL_BRICKS;
    this.hideTerrain = false;

    this.scale.set(2.1, 1.8, 1.8)
    this.position.set(1.5, 0, 0.1);

  }

  rotate() {
    this.rotation.y += Math.PI / 2;
  }

  // refreshView(map: Map) {
  //   const mesh = window.assetManager.getModel(`wallBricks`, this);

  //   this.setMesh(mesh);
  // }
}