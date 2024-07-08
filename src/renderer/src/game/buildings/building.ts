import * as THREE from 'three';
import { MapObject } from './map/mapObject';

export class Building extends MapObject {

  type = 'building';

  hideTerrain = false;

  modelName = 'building';
  panelUIType = 'building'

  initialCost = 0;
  initialBenefit = 0;

  costMoney = 0; // cost to build every second
  benefitMoney = 0; // benefit to build every second

  grid = [{
    x: 0,
    y: 0
  }]

  hoverBuilding = null;
  constructor(x = 0, y = 0) {
    super(x, y);
    this.name = 'Building';
  }

  refreshView() {
    const mesh = window.assetManager.getModel(this.modelName, this);

    this.setMesh(mesh);
  }

  dispose() {
    super.dispose();
  }

  // getGrid() {
  //   const grid = [];
  //   for (let x = 0; x < this.grid.x; x++) {
  //     for (let y = 0; y < this.grid.y; y++) {
  //       grid.push({ x: this.x + x, y: this.y + y });
  //     }
  //   }
  //   return grid;
  // }
}