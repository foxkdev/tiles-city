import { Wood } from "../../resources/wood";
import { Buildings } from "../../config/buildings";
import { BuildGenerator } from "./build-generator";
import { GenerationStatus } from "./generation-status";

export class WoodGenerator extends BuildGenerator {
  modelName = 'residential-A1';
  costMoney = 8; // cada segundo
  benefitMoney = 0; // cada segundo

  initialCost = 8;
  initialBenefit = 0;

  initialWorkers = 0;
  workersCapacity = 10;
  workersType = 'worker';
  workers = 1;
  

  requisites = []

  resource = new Wood(); // type of resource to generate -> TODO: Change to reference to resource!
  resourceGenerationCount = 1; // amount of resource to generate
  resourceGenerationTime = 10; //time in seconds(real) to generate resource
  resourcesCapacity = 100; // max amount of resources to store

  
  constructor() {
    super();
    this.name = 'WoodGenerator';
    this.type = Buildings.WOOD_GENERATOR.id;

    this.costMoney = this.initialCost;
    // SYNC WITH STORE -> FUTURE -> Cambiar a qque un transporte lo lleva.
    this.syncWithStore();
    

  }


}