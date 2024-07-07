import { Building } from "./building";
import { BuildingType } from "./buildingTypes/buildingType";

export class PartOfBuilding extends Building {
  modelName = 'grass';

  isPartOfBuilding = true; 
  
  constructor() {
    super();
    this.name = 'PartOfBuilding';
    this.type = BuildingType.PART_OF;
  }

}