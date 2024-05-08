import { Floor } from './floor';

export class Building {
  floors: Floor[];

  constructor(numFloors: number) {
    this.floors = [];
    this.createFloors(numFloors);
  }

  createFloors(numFloors: number): void {
    for (let i = 0; i < numFloors; i++) {
      const floor = new Floor(i);
      this.floors.push(floor);
    }
  }

  public renderBuilding(container: HTMLElement): void {
    container.innerHTML = '';
    this.floors.forEach((floor) => {
      container.appendChild(floor.getFloorElement());
    });
  }
}
