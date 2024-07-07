import * as THREE from 'three';
import type { City } from './city';

const SELECTED_COLOR = 0xaaaa55;
const HIGHLIGHTED_COLOR = 0x555555;
const NOT_ACTION_COLOR = 0xed2939;

export class CityObject extends THREE.Object3D {
  mesh: THREE.Mesh | null = null;
  
  worldPos: THREE.Vector3 = new THREE.Vector3();

 
  constructor(x = 0, y = 0) {
    super();
    this.name = 'CityObject'
    this.position.x = x;
    this.position.z = y;
  }

  get x() {
    this.getWorldPosition(this.worldPos);
    return Math.floor(this.worldPos.x);
  }
  get y() {
    this.getWorldPosition(this.worldPos);
    return Math.floor(this.worldPos.z);
  }

  setMesh(value: THREE.Mesh | null) {
    if(this.mesh) {
      // this.dispose();
      this.remove(this.mesh);
    }
    this.mesh = value;

    if(this.mesh) {
      this.add(this.mesh);
    }
  }

  setSelected(value) {
    if (value) {
      this.setMeshEmission(SELECTED_COLOR);
    } else {
      this.setMeshEmission(0);
    }
  }

  setFocused(value: boolean) {
    if (value) {
      this.setMeshEmission(HIGHLIGHTED_COLOR);
    } else {
      this.setMeshEmission(0);
    }
  }

  setNotAction(){
    this.setMeshEmission(NOT_ACTION_COLOR);
    setTimeout( () => {
      this.setMeshEmission(0);
    }, 1000)
  }

  /**
   * Sets the emission color of the mesh 
   * @param {number} color 
   */
  setMeshEmission(color) {
    if (!this.mesh) return;
    this.mesh.traverse((obj) => obj.material?.emissive?.setHex(color));
  }

  simulate(city?: City) { 
    // Override this method in subclasses
  }

  dispose() {
    this.mesh?.traverse((obj) => {
      if (obj.material) {
        obj.material?.dispose();
      }
    })
  }
}