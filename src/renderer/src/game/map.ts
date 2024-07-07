import * as THREE from 'three';
import { Tile } from "./city/tile";


import { createBuilding } from './city/buildings/buildingFactory';
import { BuildingType } from './city/buildings/buildingTypes/buildingType';
import type { Building } from './city/buildings/building';
import type { CityObject } from './city/cityObject';

import { tileSelected, toolActive } from '../store';
const SIZE = 100


export class Map {
  tiles: any = []
  map: any = []

  root = new THREE.Group();
  
  camera: THREE.OrthographicCamera
  scene: THREE.Scene
  raycaster: THREE.Raycaster;

  focusedTiles: Tile[] = []
  selectedTile: Tile | null = null;
  hoverTiles: Tile[] = []
  tool: any;
  constructor(camera: THREE.OrthographicCamera, scene: THREE.Scene) {
    this.camera = camera
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();

    toolActive.subscribe((tool) => {
      this.tool = tool
    })
    
  }
  // esta es la funcion que se llama desde game, llamar cuando se haya cargado datos del usuario.
  async loadMap(x: number, y: number, renderSize = 50) {
    this.renderGrid();
    await this.getMap({x, y, renderSize});
  }
  async getMap({x, y, renderSize}: any) {
    const map = await window.apiManager.get('map', {x, y, renderSize})
    this.map = map;
  }
  render() {    
    this.map.forEach((t: any) => {
        const tile = new Tile(t.x, t.y);
        if(t.type != 'TERRAIN' && t.type != 'PART_OF' && t.type != 'WALL' ) { // FALTA INCLUIR WALL EN TYPES, DEJAR SOLO TERRAIN
          const building = createBuilding(t.type);
          tile.setBuilding(building)
        }
        if(t.type === 'PART_OF') {
          tile.isPartOfBuilding = true
          tile.parentCoords = {x: t.parent.x, y: t.parent.y}
        }
        this.refreshTile(tile)
        this.root.add(tile)
        this.tiles.push(tile)
    });
    this.tiles.filter((t: Tile) => t.isPartOfBuilding).forEach((t: Tile) => {
      t.parent = this.getTile(t.parentCoords.x, t.parentCoords.y)
    });
    return this.root;
  }

  renderGrid() {
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      map: window.assetManager.textures['grid'],
      transparent: true,
      opacity: 0.2
    });

    gridMaterial.map.repeat = new THREE.Vector2(SIZE, SIZE);
    gridMaterial.map.wrapS = SIZE;
    gridMaterial.map.wrapT = SIZE; 

    const grid = new THREE.Mesh(
      new THREE.BoxGeometry(SIZE, 0.1, SIZE),
      gridMaterial
    )
    grid.position.set(SIZE / 2 - 0.5, -0.04, SIZE / 2 - 0.5);
    return grid;
  }
  renderLight() {
    const light = new THREE.Group()

    const sun = new THREE.DirectionalLight(0xffffff, 2)
    sun.position.set(-10, 20, 0);
    sun.castShadow = true;
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 50;
    sun.shadow.normalBias = 0.01;

    light.add(sun);
    light.add(new THREE.AmbientLight(0xffffff, 0.5));

    return light;
  }


  // TILES 
  getTile(x: number, y: number) {
    return this.tiles.find((tile: Tile) => tile.x === x && tile.y === y)
  }

  refreshTile(tile: Tile) {
    tile.refreshView(this);
    const x = tile.x;
    const y = tile.y;
    //actualizamos tiles que colidan con el tile.
    this.getTile(x - 1, y)?.refreshView(this);
    this.getTile(x + 1, y)?.refreshView(this);
    this.getTile(x, y - 1)?.refreshView(this);
    this.getTile(x, y + 1)?.refreshView(this);
  }

  // TOOLS
  placeBuilding(focusedTiles: Tile[], buildingType: string) {
    const canPlace = this.canPlaceTile(focusedTiles);
    if(!canPlace) {
      focusedTiles.forEach((t) => {
        t.setNotAction();
      });
      return;
    }
    const tile = focusedTiles[0]; 
    window.apiManager.post('building', { x: tile.x, y: tile.y, type: buildingType})
    const building: any = createBuilding(buildingType);
    tile.setBuilding(building)
    // tile.refreshView(this);
    this.refreshTile(tile);
    // this.addBuilding(building);
  }

  removeBuilding(x: number, y: number) {
    window.apiManager.delete('building', { x, y})
    const tile = this.getTile(x, y);
    if (tile?.building) {
      // this.removeBuilding(tile.building);

      // tile.building.dispose();
      tile.setBuilding(null);
      this.refreshTile(tile);
      
    }
  }

  moveBuilding(x: number, y: number, xTo: number, yTo: number) {
    // TODO: Plantear como hacer, pero hayy que controlar numero de clicks hechos con la herramienta puesta.
  }

  canPlaceTile(tiles: Tile[]) {
    return tiles.every((t) => !t.building)
  }

  // RAYCAST AND FOCUS
  raycast(): Tile | null {
    const mouse = new THREE.Vector2();
    mouse.x = window.inputManager.mouseScreen.x
    mouse.y = window.inputManager.mouseScreen.y

    this.raycaster.setFromCamera(mouse, this.camera);

    let intersections = this.raycaster.intersectObjects(this.root.children, true);
    if (intersections.length > 0) {
      // The tile attached to the mesh is stored in the user data
      return intersections[0].object.userData as Tile;
    } else {
      return null;
    }
  }

  checkFocusedTile() {
    this.focusedTiles.forEach((t) => {
      t.setFocused(false)
      if(t.isPartOfBuilding) {
        t.parent?.setFocused(false)
      }
    })
    // to generate grid
    // const grid = []
    // for (let i = 0; i < this.buildSize.x; i++) {
    //   for (let j = 0; j < this.buildSize.y; j++) {
    //       grid.push({ x: i, y: j });
    //   }
    // }

    // console.log('GRID', grid)
    this.focusedTiles = []
    const tile = this.raycast();
    if(tile) { 
      // console.log('TILE', tile)  
      this.tool.focus.forEach((xy: any) => {
        const t = this.getTile(tile.x + xy.x, tile.y + xy.y)
        this.focusedTiles.push(t)
      })
      
      this.focusedTiles.forEach((t) => {
        t.setFocused(true)
      })
    }

    
  }

  selectTile() {
    this.selectedTile?.setSelected(false);
    this.selectedTile = this.focusedTiles[0];
    this.selectedTile?.setSelected(true);
    tileSelected.set(this.selectedTile);
  }


  draw() {
    this.checkFocusedTile()
  }
}