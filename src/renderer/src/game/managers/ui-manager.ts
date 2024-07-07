
export class UIManager {
  constructor() {

  }
  updateBuildGenerator(id: string, { status , workers }: { status: string, workers: number }) {
    console.log('updateBuildGenerator', id, status, workers)
    const build = window.game.city.buildings.getById(id);
    if (!build) return false;
    if(status != null) {
      build.generationStatus = status;
      console.log('STATUS CHANGED')
    }
    if(workers != null) {
      build.workers = workers;
    }
    console.log('BUILD', build)
    window.game.city.buildings.update(build)
    console.log(window.game.city.buildings.getById(id))
  }
}