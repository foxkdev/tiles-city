import { City } from "../../../city";
import { Building } from "../../building";
import { BuildingType } from "../buildingType";

export class House extends Building {
  modelName = 'house';
  costMoney = 8; // cada segundo
  benefitMoney = 10; // cada segundo

  initialCost = 8;
  initialBenefit = 10;


  initialResidents = 1;
  residents = 1;
  residentsCapacity = 10;

  requisites = []
  
  constructor() {
    super();
    this.name = 'House';
    this.type = BuildingType.HOUSE;


    this.scale.set(1.8, 1.8, 1.8)
    this.position.set(0.5, 0, 0.5); // si ocupa 2x2 deberemos hacer position = size / 2 / 2
  }

  get residentsToCapacity() {
    return this.residentsCapacity - this.residents;
  }

  get residentsToCapacityPercent() { // TODO: CHECK
    return this.residents / this.residentsCapacity;
  }

  canNewResidents() {
    return this.residents < this.residentsCapacity; // TODO ADD REQUISITES
  }
  simulate(city: City) {
    this.costMoney = this.initialCost * this.residents;
    this.benefitMoney = this.initialBenefit * this.residents;
    super.simulate(city);
  }
  dispose() {
    super.dispose();
  }
}