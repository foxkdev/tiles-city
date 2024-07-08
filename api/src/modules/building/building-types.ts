const focus1x1 = [{ x: 0, y: 0 }];
const focus2x2 = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 1,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: 1,
    y: 1,
  },
];
const focus4x1 = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
];
export const BuildingTypes = {
  TERRAIN: { id: 'TERRAIN', focus: focus1x1 },
  ROAD: { id: 'ROAD', focus: focus1x1 },
  HOUSE: { id: 'HOUSE', focus: focus2x2 },
  WALL: { id: 'WALL', focus: focus1x1 },
  WOOD_GENERATOR: { id: 'WOOD_GENERATOR', focus: focus2x2 },
  TREE: { id: 'TREE', focus: focus1x1 },
  WALL_BRICKS: { id: 'WALL_BRICKS', focus: focus4x1 },
};
