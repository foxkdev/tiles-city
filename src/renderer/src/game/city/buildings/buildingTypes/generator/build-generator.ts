import { Resource } from "../../../../resources/resource";
import { City } from "../../../city";
import { Building } from "../../building";
import { BuildingType } from "../buildingType";
import { GenerationStatus } from "./generation-status";

export class BuildGenerator extends Building {
  modelName = 'residential-A1';
  panelUIType = 'BUILD_GENERATOR'
  costMoney = 8; // cada segundo
  benefitMoney = 0; // cada segundo

  initialCost = 8;
  initialBenefit = 0;

  initialWorkers = 0;
  workersCapacity = 10;
  workersType = 'worker';
  workers = 0;
  

  requisites = []

  resource: Resource = new Resource('resource', 'resource', 'icon'); // type of resource to generate -> TODO: Change to reference to resource!
  resourceGenerationCount = 1; // amount of resource to generate
  resourceGenerationTime = 30; //time in seconds(real) to generate resource
  resourcesCapacity = 100; // max amount of resources to store
  resources = 0; // current amount of resources stored


  generationStatus = GenerationStatus.GENERATING;
  
  constructor() {
    super();
    this.name = 'Resource';
    this.type = BuildingType.GENERATOR;

    this.costMoney = this.initialCost;


  }

  simulate() {
    
    this.checkStatus();
    // Generate resource
    if(this.generationStatus === GenerationStatus.GENERATING) {
      this.generateResource();
    }

    super.simulate();
  }
  dispose() {
    super.dispose();
  }
  setStatus(status: string) {
    this.generationStatus = status;
  }
  canStore() {
    if (this.generationStatus === GenerationStatus.STORAGE_FULL) return false;

    const countNewResource = (this.resourceGenerationCount * this.workers) / this.resourceGenerationTime;
    return this.resources + countNewResource <= this.resourcesCapacity;

  }
  generateResource() {
    if(this.canStore()) {
      this.resources += (this.resourceGenerationCount * this.workers) / this.resourceGenerationTime;
    }else {
      this.generationStatus = GenerationStatus.STORAGE_FULL;
    }
  }

  pause() {
    this.generationStatus = GenerationStatus.PAUSED;
  }

  setWorkers(workers: number) {
    if(workers >= 0 && workers < this.workersCapacity) {
      this.workers = workers
    }
    this.checkStatus();
    this.calculateBenefit()
  }

  checkStatus() {
    this.generationStatus = GenerationStatus.GENERATING;

    if(this.workers === 0) {
      this.generationStatus = GenerationStatus.NO_WORKERS;
    }

    if(this.resources >= this.resourcesCapacity) {
      this.generationStatus = GenerationStatus.STORAGE_FULL;
    }
    
    //TODO: LINK
  }

  calculateBenefit() {
    this.benefitMoney = this.initialBenefit * this.workers;
  }

  syncWithStore() {
    // Esto cambiara cuando se implemente el transporte entre generador y store
    setInterval(() => {
      // window.storeManager.addToStorage(this.resource, Math.round(this.resources));
      this.resources = 0;
    }, this.resourceGenerationTime * 1000)
  }
}