import * as THREE from 'three';
import { Building } from '../building';
import { BuildingType } from '../buildingTypes/buildingType';
import type { Map } from '../../../map';

export class Tree extends Building {
  modelName = 'tree';
  constructor() {
    super();
    this.name = 'Tree';
    this.type = BuildingType.TREE;
    this.hideTerrain = false;

    const randomRotationCount = Math.floor(Math.random() * 4);

    const angles = [0, 90, 180, 270]
    this.rotation.set(0, THREE.MathUtils.degToRad(angles[randomRotationCount]), 0);
  }

  refreshView(map: Map) {
    const mesh = window.assetManager.getModel(`tree`, this);

    this.setMesh(mesh);
  }
}