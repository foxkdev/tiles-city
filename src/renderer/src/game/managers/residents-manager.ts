
import type { Building } from "../city/buildings/building";
import { BuildingType } from "../city/buildings/buildingTypes/buildingType";
import type { House } from "../city/buildings/buildingTypes/houses/house";
import { totalResidents, totalResidentsCapacity } from ".../store";
export class ResidentsManager {
  totalResidents = 0
  totalResidentsCapacity = 0
  constructor() {

  }

  addResidents(residents: number) {
    this.totalResidents += residents;
    // totalResidents.set(this.totalResidents);
  }
  removeResidents(residents: number) {
    this.totalResidents -= residents;
    // totalResidents.set(this.totalResidents);
  }
  addResidentsCapacity(capacity: number) {
    this.totalResidentsCapacity += capacity;
    // totalResidentsCapacity.set(this.totalResidentsCapacity);
  }
  removeResidentsCapacity(capacity: number) {
    this.totalResidentsCapacity -= capacity;
    // totalResidentsCapacity.set(this.totalResidentsCapacity);
  }

  canAddResidents(residents: number) {
    return this.totalResidents + residents <= this.totalResidentsCapacity;
  }

  simulate() {
    let total = 0;
    let cap = 0;
    window.game.city.buildings.getByType(BuildingType.HOUSE).forEach((house: House) => {
      total += house.residents;
      cap += house.residentsCapacity;
      if(house.canNewResidents()) {
        house.residents++;
        window.game.city.buildings.update(house);
      }
      
    });
    this.totalResidents = total;
    this.totalResidentsCapacity = cap;

    totalResidents.set(this.totalResidents);
    totalResidentsCapacity.set(this.totalResidentsCapacity);
  }
}