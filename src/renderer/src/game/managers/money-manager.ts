
import type { Building } from '../buildings/building';
import type { Tile } from '../buildings/map/tile';
import { totalMoney, totalBenefits } from '.../store';


export class MoneyManager {
  totalMoney: number;
  totalBenefits: number;

  totalIncome: number = 0
  totalCosts: number = 0

  constructor() {
    this.totalMoney = 40000;
    this.totalBenefits = 0;

  }

  simulate() {
    this.calculateBenefits();
    this.totalMoney += this.totalBenefits / 12; // cada segundo real son 12 segundos en el juego
    totalMoney.set(this.totalMoney);
    totalBenefits.set(this.totalBenefits);
  }

  calculateBenefits() {
    let totalIncome = 0;
    let totalCosts = 0;
    window.game.city.buildings.getAll().forEach((building: Building) => {
      totalIncome += building.benefitMoney;
      totalCosts += building.costMoney;
    });
    this.totalCosts = totalCosts;
    this.totalIncome = totalIncome;
    this.totalBenefits = this.totalIncome - this.totalCosts;
  }


  syncWithServer() {
    // TODO: sync money with server every 10 seconds
  }
}