import { writable, derived } from 'svelte/store';
import { tools } from './tools';

export const gameLoaded = writable(false);

export const tileSelected = writable(undefined);

export const toolActive = writable(tools['SELECT']);

export const totalMoney = writable(0);
export const totalBenefits = writable(0);

export const formattedBenefits = derived(totalBenefits, $totalBenefits => {
  let prefix = '+'
  if($totalBenefits <= 0) {
    prefix = ''
  }
  return `${prefix}${$totalBenefits}`
})

export const formattedMoney = derived(totalMoney, $totalMoney => {
  return Math.floor($totalMoney).toLocaleString('en-US')
})

export const totalResidents = writable(0);
export const totalResidentsCapacity = writable(0);

export const time = writable("00:00");
export const days = writable(1);
export const isNight = writable(false);

export const resourcesStored = writable([])

export const resourcesGridUI = derived(resourcesStored, $resourcesStored => {
  const grid: Array<{resource: any, amount: number} | null> = Array(10).fill(null)
  for(let i = 0; i < $resourcesStored.length; i++) {
    grid[i] = $resourcesStored[i]
  }
  return grid;
})

/* Building PANELS */
export const buildPanelActive = writable(false);
export const buildPanelSelected = writable(undefined);


