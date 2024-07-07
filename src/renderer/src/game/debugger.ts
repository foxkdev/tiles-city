import Stats from 'three/addons/libs/stats.module.js';
export class Debugger {
  dom: HTMLElement;
  stats: Stats;
  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.stats = new Stats();


    this.dom.appendChild(this.stats.dom);
  }

  draw() {
    this.stats.update();
  }
}