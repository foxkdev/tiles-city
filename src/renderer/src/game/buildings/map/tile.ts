import type { Map } from "../../map";
import { Building } from "../building";
import { MapObject } from "./mapObject";

export class Tile extends MapObject {
  terrain: string = 'grass';

  building: any = null;
  isPartOfBuilding: boolean = false;
  
  parent: Tile | null = null;
  parentCoords: {x: number, y: number} = {x: 0, y: 0};
  constructor(x: number, y: number) {
    super(x, y);
    this.name = `Tile-${this.x}-${this.y}`;
  }

  setBuilding(building: Building | null) {
    // Remove and dispose resources for existing building
    if (this.building) {
      this.building.dispose();
      this.remove(this.building);
    }

    this.building = building;

    // Add to scene graph
    if (building) {
      this.add(this.building);
    }
  }

  refreshView(map?: Map) {
    this.building?.refreshView(map);
    if (this.building?.hideTerrain) {
      this.setMesh(null);
    } else if(!this.isPartOfBuilding){
      const mesh = window.assetManager.getModel(this.terrain, this);
      mesh.name = this.terrain;
      this.setMesh(mesh);
    }
  }

  setFocused(value: boolean): void {
    super.setFocused(value);
    this.building?.setFocused(value);
    // this.parent?.setFocused(value);
  }
}