import { MapObject } from "../buildings/map/mapObject";
import * as THREE from 'three';
import { Vehicles } from "../config/vehicles";
export class Explorer extends MapObject {
  building: any = null;
  
  model = 'explorer';
  
  constructor(x: number, y: number) {
    super(x, y);
    this.name = `Explorer-${this.x}-${this.y}`;
    this.type = Vehicles.EXPLORER.id;
  }

  refreshView() {
    const mesh = window.assetManager.getModel(this.model, this);
    mesh.name = this.model;
    this.setMesh(mesh);
  }

  setRotation(rotation: number) {
    this.rotation.set(0, THREE.MathUtils.degToRad(rotation), 0);   
  }

  
}