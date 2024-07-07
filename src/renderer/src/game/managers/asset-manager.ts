import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import models from '../config/models';

export class AssetManager {
  textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  modelLoader = new GLTFLoader();
  textures = {
    'base': this.loadTexture(`textures/base.png`),
    'specular': this.loadTexture(`textures/specular.png`),
    'grid': this.loadTexture('textures/grid.png'),
    'world': this.loadTexture('textures/world001.png')
  }
  models = {}

  modelCount = 0;
  loadedModelCount = 0;

  // onLoad: Function;
  constructor(onLoad?: Function) {
    this.modelCount = Object.keys(models).length;
    this.loadedModelCount = 0;

    // for (const [name, meta] of Object.entries(models)) {
    //   this.loadModel(name, meta);
    // }
    // this.onLoad = onLoad
  }
  async loadAssets() {
    for (const [name, meta] of Object.entries(models)) {
      await this.loadModel(name, meta);
    }
    if (this.loadedModelCount == this.modelCount) {
      return true
    }
    return false;
  }
  getModel(name, cityObject, transparent = false) {
    const mesh = this.models[name].clone();

    // Clone materials so each object has a unique material
    // This is so we can set the modify the texture of each
    // mesh independently (e.g. highlight on mouse over,
    // abandoned buildings, etc.))
    mesh.traverse((obj) => {
      obj.userData = cityObject;
      if(obj.material) {
        obj.material = obj.material.clone();
        obj.material.transparent = transparent;
      }
    })
    return mesh

  }

  async loadModel(name: string, { textures, filename, scale = 2, rotation = 0, randomRotation = false, receiveShadow = true, castShadow = true}: any) {
    return new Promise((resolve, reject) => {
      this.modelLoader.load(`models/${filename}`, (glb) => {
        let mesh = glb.scene;
  
        mesh.name = filename;
  
        mesh.traverse((obj) => {
          if (obj.material) {
            obj.material = new THREE.MeshLambertMaterial({
              map: this.textures[textures] || this.textures.world,
              specularMap: this.textures.specular
            })
            obj.receiveShadow = receiveShadow;
            obj.castShadow = castShadow;
          }
        });
        
        // if(randomRotation) {
        //   const randomRotationCount = Math.floor(Math.random() * 4);
        //   for (let i = 0; i < randomRotationCount; i++) {
        //     mesh.rotateY(Math.PI / 2); // Rotación de 90 grados alrededor del eje Y (en radianes)
        //   }
        // } else {
        //   mesh.rotation.set(0, THREE.MathUtils.degToRad(rotation), 0);
        // }
        mesh.rotation.set(0, THREE.MathUtils.degToRad(rotation), 0);
        
        mesh.scale.set(scale / 30, scale / 30, scale / 30);
  
        this.models[name] = mesh;
  
        this.loadedModelCount++;
        resolve(mesh);
        
      },
      (xhr) => {
        // console.log(`${(xhr.loaded / xhr.total * 100)}% models loaded`);
      },
      (error) => {
        console.error('An error happened', error);
        reject(error);
      });
    });

  }
  loadTexture(path: string, flipY = false) {
    const texture = this.textureLoader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = flipY;
    return texture;
  }
}