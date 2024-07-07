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

export const BuildingTypes = {
  TERRAIN: { id: 'TERRAIN', focus: focus1x1 },
  ROAD: { id: 'ROAD', focus: focus1x1 },
  HOUSE: { id: 'HOUSE', focus: focus2x2 },
  WALL: { id: 'WALL', focus: focus1x1 },
  WOOD_GENERATOR: { id: 'WOOD_GENERATOR', focus: focus2x2 },
};
