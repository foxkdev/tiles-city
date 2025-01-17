import * as THREE from 'three';
import { Building } from '../building';
import { Buildings } from "../../config/buildings";
import type { Map } from '../../map';

export class Road extends Building {
  modelName = 'road';
  constructor() {
    super();
    this.name = 'Road';
    this.type = Buildings.ROAD.id;
    this.hideTerrain = false;

    // const randomRotationCount = Math.floor(Math.random() * 4);

    // const angles = [0, 90, 180, 270]
    // this.rotation.set(0, THREE.MathUtils.degToRad(angles[randomRotationCount]), 0);
  }
  
  refreshView(map: Map) {
    const mesh = window.assetManager.getModel(`road`, this);

    this.setMesh(mesh);
  }
  
}