const focus1x1 = [{x: 0, y: 0}]
const focus2x2 = [
  {
      "x": 0,
      "y": 0
  },
  {
      "x": 0,
      "y": 1
  },
  {
      "x": 1,
      "y": 0
  },
  {
      "x": 1,
      "y": 1
  }
]

export const tools = {
  SELECT: { id: 'SELECT', toolId: 'SELECT', text: 'SELECT', size: {x: 1, y: 1}, focus: focus1x1},
  DELETE: { id: 'DELETE', toolId: 'DELETE', text: 'DELETE', size: {x: 1, y: 1}, focus: focus1x1},
  MOVE: { id: 'MOVE', toolId: 'MOVE', text: 'MOVE',  size: {x: 1, y: 1}, focus: focus1x1},
  ROAD: { id: 'ROAD', toolId: 'PLACE', text: 'ROAD', size: {x: 1, y: 1}, focus: focus1x1},
  HOUSE: { id: 'HOUSE', toolId: 'PLACE', text: 'HOUSE', size: {x: 2, y: 2}, focus: focus2x2},
  WOOD_GENERATOR:  { id: 'WOOD_GENERATOR', toolId: 'PLACE', text: 'WOOD', size: {x: 2, y: 2}, focus: focus2x2},
}