

import { BuildingType } from "../buildings/buildingType";
import { BuildGenerator } from "../buildings/generator/build-generator";
import { Resource } from "../resources/resource";
import { Wood } from "../resources/wood";

export class ResourcesManager {

  resources: Resource[] = []
  constructor() {
    this.loadResources();
  }

  loadResources(){
    this.resources = [
      new Wood()
    ]
  }

  getResources() {
    return this.resources;
  }

  getResourceById(id: string) {
    return this.resources.find(r => r.id === id);
  }

  // TODO: Add Production VIEW
  simulate() {
    // Generamos resources en cada build.
    window.game.city.buildings.getByType(BuildingType.GENERATOR).forEach((buildGenerator: BuildGenerator) => {
      buildGenerator.simulate();
    });
  }


}