import type { Building } from '../buildings/building';


export class City {
  id: number = 0;
  x: number = 0
  y: number = 0
  name: string = '';
  population: number = 0;
  max_store: number = 0;
  technology_age: number = 0;

  buildings: Building[] = []; // to manage buildings with managers
  constructor() {

    
    
  }

  async getCityFromServer(id: number) {
    const city = await window.apiManager.get(`city/${id}`, { userId: 1});
    console.log('X', city.x, 'Y', city.y)
    this.id = city.id;
    this.x = city.x;
    this.y = city.y;
    this.name = city.name;
    this.population = city.population;
    this.max_store = city.max_store;
    this.technology_age = city.technology_age;
    // console.log('CITY', city)

  }


  // BUILDINGS
  getBuildingsByType(type: string) {
    return this.buildings.filter(b => b.type === type)
  }
  addBuilding(building: Building) {
    this.buildings.push(building);
  }
  getBuilding(x: number, y: number): Building | null {
    return this.buildings.find(b => b.position.x === x && b.position.z === y) || null;
  }
  updateBuilding(building: Building) {
    const index = this.buildings.findIndex(b => b.id === building.id);;
    this.buildings[index] = building;
  }
  removeBuilding(building: Building) {
    const index = this.buildings.findIndex(b => b.id === building.id);
    this.buildings.splice(index, 1);
  }
  

  draw() {

  }
}