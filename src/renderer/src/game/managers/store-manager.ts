


import { Resource } from "../resources/resource";
import type { ResourcesManager } from "./resources-manager";

import { resourcesStored } from ".../store";

interface ResourceStorage {
  resource: Resource
  amount: number;
}

export class StoreManager {
  

  resourcesStored: ResourceStorage[] = []
  constructor(resourcesManager: ResourcesManager) {
    this.loadResources(resourcesManager.getResources());
  }

  // TODO: Add Production VIEW
  simulate() {
    // update UI
    resourcesStored.set(this.resourcesStored);
    // console.log(this.resourcesStored)
  }
  loadResources(resources: Resource[]) {
    resources.forEach((r: Resource) => {
      this.resourcesStored.push({ resource: r, amount: 0 })
    });
  }

  addToStorage(resource: Resource, amount: number) {
    const store = this.getResource(resource);
    if(store) {
      store.amount += amount;
      this.updateResource(store)
      return;
    }
    throw new Error('Resource not found');
  }
  removeFromStorage(resource: Resource, amount: number) {
    const store = this.getResource(resource);
    if(store) {
      store.amount -= amount;
      this.updateResource(store)
    }
    throw new Error('Resource not found');
  }
  getResource(resource: Resource) {
    return this.resourcesStored.find(r => r.resource.id === resource.id);
  }
  updateResource(store: ResourceStorage) {
    const storeIdx = this.resourcesStored.findIndex(r => r.resource.id === store.resource.id);
    this.resourcesStored[storeIdx] = store;
  }


}