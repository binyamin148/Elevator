import { Elevator } from './elevator';
import { Floor } from './floor';

export class Building {
  floors: Floor[];
  elevators: Elevator[];

  constructor(numFloors: number, numElevators: number) {
    this.floors = [];
    this.elevators = [];
    this.createFloors(numFloors);
    this.createElevators(numElevators);
  }

  createFloors(numFloors: number): void {
    for (let i = 0; i < numFloors; i++) {
      const floor = new Floor(i);
      this.floors.push(floor);
    }
  }

  createElevators(numElevators: number): void {
    for (let i = 0; i < numElevators; i++) {
      const elevator = new Elevator(i);
      this.elevators.push(elevator);
    }
  }

  public renderBuilding(container: HTMLElement): void {
    container.innerHTML = '';
    this.floors.forEach((floor) => {
      container.appendChild(floor.getFloorElement());
    });
    this.elevators.forEach((elevator) => {
      container.appendChild(elevator.getElevatorElement());
    });
  }
}
