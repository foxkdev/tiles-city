import * as THREE from 'three';

import { config } from './config/config';
// -- Constants --
const DEG2RAD = Math.PI / 180.0;
const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 2;

// Camera constraints
const CAMERA_SIZE = 5;
const MIN_CAMERA_RADIUS = config.camera.zoom.min;
const MAX_CAMERA_RADIUS = config.camera.zoom.max;
const MIN_CAMERA_ELEVATION = 45;
const MAX_CAMERA_ELEVATION = 45;

// Camera sensitivity
const AZIMUTH_SENSITIVITY = 0.2;
const ELEVATION_SENSITIVITY = 0.2;
const ZOOM_SENSITIVITY = 0.002;
const PAN_SENSITIVITY = -0.01;

const Y_AXIS = new THREE.Vector3(0, 1, 0);


const MAP_DEFAULT_LOADED_SIZE = 50
const MAP_LOAD_MORE_RANGE = 10
export class CameraManager {
  dom: HTMLElement;
  camera: THREE.OrthographicCamera;
  cameraOrigin: THREE.Vector3;
  cameraRadius: number;
  cameraAzimuth: number;
  cameraElevation: number;

  private static instance: CameraManager | null = null;
  constructor(dom: HTMLElement) {
    this.dom = dom;
    const aspect = this.dom.clientWidth / this.dom.clientHeight;

    this.camera = new THREE.OrthographicCamera(
      (CAMERA_SIZE * aspect) / -2,
      (CAMERA_SIZE * aspect) / 2,
      CAMERA_SIZE / 2,
      CAMERA_SIZE / -2, 1, 1000);
    this.camera.layers.enable(1);
    
    this.cameraOrigin = new THREE.Vector3(8, 0, 8);
    this.cameraRadius = 0.5;
    this.cameraAzimuth = 225;
    this.cameraElevation = 45;

    this.updateCameraPosition();

    this.dom.addEventListener('wheel', this.onMouseScroll.bind(this), false);
    this.dom.addEventListener('mousedown', this.onMouseMove.bind(this), false);
    this.dom.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  public static getInstance(dom: HTMLElement): CameraManager {
    if(!CameraManager.instance) {
      CameraManager.instance = new CameraManager(dom)
    }
    return CameraManager.instance;
  }

  

  onMouseScroll(event: WheelEvent) {
    this.cameraRadius *= 1 - (event.deltaY * ZOOM_SENSITIVITY);
    this.cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, this.cameraRadius));
    this.updateCameraPosition();
  }

  onMouseMove(event: MouseEvent) {
    // Handles the rotation of the camera
    if (event.buttons & LEFT_MOUSE_BUTTON && !window.game.inBuildingMode) {
      this.cameraAzimuth += -(event.movementX * AZIMUTH_SENSITIVITY);
      this.cameraElevation += (event.movementY * ELEVATION_SENSITIVITY);
      this.cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, this.cameraElevation));
    }

    // Handles the panning of the camera
    if (event.buttons & RIGHT_MOUSE_BUTTON) {
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, this.cameraAzimuth * DEG2RAD);
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, this.cameraAzimuth * DEG2RAD);
      this.cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * event.movementY));
      this.cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * event.movementX));
    }

    this.updateCameraPosition();

    this.checkCameraInLimits()
  }
  

  cameraLeft() {
    this.cameraOrigin.add(new THREE.Vector3(1, 0, 0));
    this.updateCameraPosition()
  }
  cameraRight() {
    this.cameraOrigin.add(new THREE.Vector3(-1, 0, 0));
    this.updateCameraPosition()
  }
  cameraUp() {
    this.cameraOrigin.add(new THREE.Vector3(0, 0, 1));
    this.updateCameraPosition()
  }
  cameraDown() {
    this.cameraOrigin.add(new THREE.Vector3(0, 0, -1));
    this.updateCameraPosition()
  }

  goTo(x: number, y: number) {
    this.cameraOrigin.add(new THREE.Vector3(x, 0, y));
    this.updateCameraPosition();
  }

  checkCameraInLimits() {
    // console.log(this.camera.position);
    if(this.camera.position.x > (MAP_DEFAULT_LOADED_SIZE-MAP_LOAD_MORE_RANGE * -1)) {
      //notify map to load more content and render
      // console.log('LIMIT X')
    }
    if(this.camera.position.y > (MAP_DEFAULT_LOADED_SIZE-MAP_LOAD_MORE_RANGE * -1)) {
      //notify map to load more content and render
      // console.log('LIMIT Y')
    }
  }

  updateCameraPosition() {
    this.camera.zoom = this.cameraRadius;
    this.camera.position.x = 100 * Math.sin(this.cameraAzimuth * DEG2RAD) * Math.cos(this.cameraElevation * DEG2RAD);
    this.camera.position.y = 100 * Math.sin(this.cameraElevation * DEG2RAD);
    this.camera.position.z = 100 * Math.cos(this.cameraAzimuth * DEG2RAD) * Math.cos(this.cameraElevation * DEG2RAD);
    this.camera.position.add(this.cameraOrigin);
    this.camera.lookAt(this.cameraOrigin);
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
  }

  resize() {
    const aspect = this.dom.clientWidth / this.dom.clientHeight;
    this.camera.left = (CAMERA_SIZE * aspect) / -2;
    this.camera.right = (CAMERA_SIZE * aspect) / 2;
    this.camera.updateProjectionMatrix();
  }

}