import { BuildingType } from "./buildingTypes/buildingType"
import { House } from "./buildingTypes/houses/house"
import { Road } from "./transportation/road";
import { WoodGenerator } from "./buildingTypes/generator/wood-generator";
import { Tree } from "./map/tree";
import { PartOfBuilding } from "./partOfBuilding";

const buildingConstructors = {
  [BuildingType.PART_OF]: PartOfBuilding,
  [BuildingType.HOUSE]: House,
  [BuildingType.ROAD]: Road,
  ['WOOD_GENERATOR']: WoodGenerator,
  [BuildingType.TREE]: Tree
}
export function createBuilding(buildingType: string) {
  const BuildingConstructor = buildingConstructors[buildingType];
  if (!BuildingConstructor) {
    console.error(`Building type ${buildingType} not found`);
    throw new Error(`Building type ${buildingType} not found`);
  }
  return new BuildingConstructor();
}