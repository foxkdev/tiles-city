
const GAME_SECONDS = 12; // cada segundo real son 12 segundos en juego, 5 segundos real = 1 minuto juego -> 
const GAME_DAY = 86400 // 2h real = 1D juego 12*60s(real)*60m*2=86400s
const GAME_NIGHT = 75600 // 21:00

import { time, days, isNight } from '.../store';
export class TimeManager {
  currentDay: number = 1;
  currentSeconds: number = 0;
  isNight: boolean = false;

  constructor() {
    setInterval(this.simulate.bind(this), 1000) // cada segundo real actualizamos time.
    setInterval(this.syncTime.bind(this), 10000) // cada 10 segundos sincronizamos con el servidor

    // DEBUG
    // this.currentSeconds = 75600; // night
  }
  simulate() { // cada segundo debe llamarse
    this.calculateTime();

    time.set(this.time);
    days.set(this.currentDay);
    isNight.set(this.isNight);
  }

  calculateTime() {
    this.currentSeconds += GAME_SECONDS;
    if (this.currentSeconds >= GAME_DAY) {
      this.currentSeconds = 0;
      this.currentDay++;
    }
    if(this.currentSeconds >= GAME_NIGHT) {
      this.isNight = true;
    }
  }

  get time() { // TODO: Check performance on this getter
    const hours = Math.floor(this.currentSeconds / 3600);
    const minutes = Math.floor((this.currentSeconds % 3600) / 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  syncTime() {
    // TODO: sync time with server every 10 seconds
  }
  
}