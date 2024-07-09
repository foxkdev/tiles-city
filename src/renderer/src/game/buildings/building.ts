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
    this.grid = this.getGrid();
  }

  refreshView() {
    const mesh = window.assetManager.getModel(this.modelName, this);

    this.setMesh(mesh);
  }
  
  dispose() {
    super.dispose();
  }
  getGrid() {
    return [
      {
        x: 0,
        y: 0
      }
    ]
  }
  getGridRotated() {
    return [
      {
        x: 0,
        y: 0
      }
    ]
  }
  setRotation(rotation: number) {
    this.rotation.set(0, THREE.MathUtils.degToRad(rotation), 0);
    
    if(rotation === 90 || rotation === 270) {
      this.grid = this.getGridRotated();
    } else {
      this.grid = this.getGrid()
    }

    
    
  }
}