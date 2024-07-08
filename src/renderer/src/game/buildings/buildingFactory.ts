import { Buildings } from "../config/buildings"
import { House } from "./houses/house"
import { Road } from "./transportation/road";
import { WoodGenerator } from "./generator/wood-generator";
import { Tree } from "./map/tree";
import { WallBricks } from "./walls/wallBricks";

const buildingConstructors = {
  [Buildings.HOUSE.id]: House,
  [Buildings.ROAD.id]: Road,
  [Buildings.WOOD_GENERATOR.id]: WoodGenerator,
  [Buildings.TREE.id]: Tree,
  [Buildings.WALL_BRICKS.id]: WallBricks,
}
export function createBuilding(buildingType: string) {
  const BuildingConstructor = buildingConstructors[buildingType];
  if (!BuildingConstructor) {
    console.error(`Building type ${buildingType} not found`);
    throw new Error(`Building type ${buildingType} not found`);
  }
  return new BuildingConstructor();
}