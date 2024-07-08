import { tools } from "../tools";
import { toolActive, lastToolActive } from "../store";
import { CameraManager } from "./camera";
export class InputManager {
  dom: HTMLElement;
  mouse = { x: 0, y: 0}
  mouseScreen = { x: 0, y: 0 }
  isLeftMouseDown = false;

  isMiddleMouseDown = false;

  isRightMouseDown = false;

  keybindings: { [key: string]: Function } = {}
  
  cameraManager: CameraManager;

  toolActive: any;
  private static instance: InputManager | null = null;
  constructor(dom: HTMLElement) {
    this.dom = dom
    this.cameraManager = CameraManager.getInstance(this.dom)

    this.dom.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    this.dom.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    this.dom.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.dom.addEventListener('contextmenu', (event) => event.preventDefault(), false);
    document.addEventListener('keydown', this.onKeyDown.bind(this), false);

    this.keybindings = {}

    toolActive.subscribe(value => {
      this.toolActive = value;
    })

    this.loadKeybindings()
  }

  public static getInstance(dom: HTMLElement): InputManager {
    if(!InputManager.instance) {
      InputManager.instance = new InputManager(dom)
    }
    return InputManager.instance;
  }

  onMouseDown(event: MouseEvent) {
    if (event.button === 0) {
      this.isLeftMouseDown = true;
      window.game.useTool()
    }
    if (event.button === 1) {
      this.isMiddleMouseDown = true;
    }
    if (event.button === 2) {
      this.isRightMouseDown = true;
    }
  }

  onMouseUp(event: MouseEvent) {
    if (event.button === 0) {
      this.isLeftMouseDown = false;
    }
    if (event.button === 1) {
      this.isMiddleMouseDown = false;
    }
    if (event.button === 2) {
      this.isRightMouseDown = false;
    }
  }
  onMouseMove(event: MouseEvent) {
    this.isLeftMouseDown = event.buttons == 1;
    this.isRightMouseDown = event.buttons == 2;
    this.isMiddleMouseDown = event.buttons == 4;

    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;

    this.mouseScreen = {
      x: (this.mouse.x / this.dom.clientWidth) * 2 - 1,
      y: -(this.mouse.y / this.dom.clientHeight) * 2 + 1
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if(!this.keybindings[event.key]) return;

    this.keybindings[event.key]()
  }

  loadKeybindings() {
    const defaultKeybindings = {
      Escape: () => this.setTool(tools['SELECT']),
      s: () => this.setTool(tools['SELECT']),
      h: () => this.setTool(tools['HOUSE']),
      d: () => this.setTool(tools['DELETE']),
      r: () => this.setTool(tools['ROTATE']),
      ArrowUp: () => this.cameraManager.cameraUp(),
      ArrowDown: () => this.cameraManager.cameraDown(),
      ArrowLeft: () => this.cameraManager.cameraLeft(),
      ArrowRight: () => this.cameraManager.cameraRight()
    }

    this.keybindings = defaultKeybindings
  }
  setTool(tool: any) {
    lastToolActive.set(this.toolActivess)
    toolActive.set(tool)
  }
}