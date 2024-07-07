import * as THREE from 'three';
import { CameraManager } from './camera';


import { AssetManager } from './managers/asset-manager';
import { City } from './city/city';
import { InputManager } from './input';
import { CityObject } from './city/cityObject';

import { config } from './config/config';

import { toolActive, gameLoaded, tileSelected } from '../store';
import { Map } from './map';
import type { Building } from './city/buildings/building';
import { ApiManager } from './managers/api-manager';
// import { TimeManager } from './managers/time-manager';
// import { MoneyManager } from './managers/money-manager';
// import { ResidentsManager } from './managers/residents-manager';
// import { ResourcesManager } from './managers/resources-manager';
// import { StoreManager } from './managers/store-manager';
export class Game {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  
  city!: City;
  cameraManager: CameraManager;

  focusedObject: CityObject | null = null;
  selectedObject: CityObject | null = null;

  inBuildingMode: boolean = false;
  toolActive: any = {};
  dom: HTMLElement;

  // timeManager: TimeManager;
  // moneyManager: MoneyManager;
  // residentsManager: ResidentsManager;
  // resourcesManager: ResourcesManager;
  mapManager!: Map;
  constructor(dom: HTMLElement) {
    this.dom = dom
    window.apiManager = new ApiManager();


    window.inputManager = InputManager.getInstance(this.dom);
    this.cameraManager = CameraManager.getInstance(this.dom);
    
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    this.scene = new THREE.Scene();
    
    

    this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
    this.renderer.setClearColor(0xFFFFFF);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    // this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.dom.appendChild(this.renderer.domElement);

    window.assetManager = new AssetManager();

    // Subscribe When UI change tool
    toolActive.subscribe(value => {
      this.toolActive = value;
    });

    window.addEventListener('resize', this.onResize.bind(this));
    // this.onResize();
  }

  async join() {
    // TODO: cuando tengamos usuarios camabiar a hacer peticion /user/join y que nos de el id de la ciudad
    const loaded = await window.assetManager.loadAssets();
    this.city = new City();
    await this.city.getCityFromServer(1);
    this.mapManager = new Map(this.cameraManager.camera, this.scene)
    await this.mapManager.loadMap(this.city.x, this.city.y)
    console.log('LOAD MAP OK')
    // // this.timeManager = new TimeManager();
    // // this.moneyManager = new MoneyManager();
    // // this.residentsManager = new ResidentsManager();
    // // this.resourcesManager = new ResourcesManager();
    // // window.storeManager = new StoreManager(this.resourcesManager)
    this.initialize();
    this.start();
    
    
    setInterval(this.simulate.bind(this), 1000)
  }
  async initialize() {
    this.scene.clear();
    this.scene.add(this.mapManager.renderGrid())
    this.scene.add(this.mapManager.render())
    this.scene.add(this.mapManager.renderLight())
    // this.scene.add(this.city);
    await this.cameraManager.goTo(this.city.x*1.5, this.city.y*1.5)
    
  }

  start() {
    // requestAnimationFrame(this.draw.bind(this));
    this.renderer.setAnimationLoop(this.draw.bind(this));
    
    this.draw();
    console.log('Rendered Completed')
    gameLoaded.set(true);
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  // CALLED EVERY 1 SECOND
  simulate() {
    // this.city.simulate() // TODO: para algo se necesita?
    // this.moneyManager.simulate()
    // this.residentsManager.simulate()
    // this.resourcesManager.simulate()
    // window.storeManager.simulate()
  }

  // every millisecond, CRITICAL, CUIDADO CON QUE METER EN EL DRAW
  draw() {
    this.mapManager.draw()
    this.city.draw();
    
    window.debugger?.draw();

    this.renderer.render(this.scene, this.cameraManager.camera);
  }
  setInBuildingMode(value: boolean) {
    this.inBuildingMode = value;
  }

  selectMode() {
    this.setInBuildingMode(false);
    this.mapManager.selectTile();
  }

  placeMode(building: Building) {
    this.setInBuildingMode(true);
    // const tile = this.mapManager.focusedTiles[0];
    this.mapManager.placeBuilding(this.mapManager.focusedTiles, this.toolActive.id);
  }

  deleteMode(building: Building) {
    this.setInBuildingMode(true);
    const tile = this.mapManager.focusedTiles[0];
    this.mapManager.removeBuilding(tile.x, tile.y);
  }

  moveMode(building: Building) {
    this.setInBuildingMode(true);
    const { x, y } = this.mapManager.focusedTile;
    // NECESITAMOS CONTROLAR LOS CLICKS
  }
  useTool() {
    const tools = {
      SELECT: this.selectMode.bind(this),
      DELETE: this.deleteMode.bind(this),
      PLACE: this.placeMode.bind(this),
      MOVE: this.moveMode.bind(this)
    }

    tools[this.toolActive.toolId](this.toolActive.id)
    
  }

  onResize() {
    this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
    this.cameraManager.resize();
  }
}