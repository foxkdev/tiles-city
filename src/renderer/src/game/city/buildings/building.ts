import * as THREE from 'three';
import { CityObject } from '../cityObject';
import { City } from '../city';

export class Building extends CityObject {

  type = 'building';

  hideTerrain = false;

  modelName = 'building';
  panelUIType = 'building'

  initialCost = 0;
  initialBenefit = 0;

  costMoney = 0; // cost to build every second
  benefitMoney = 0; // benefit to build every second

  
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
}