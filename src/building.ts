import { Floor } from './floor';
import { Settings } from './settings';
import { Elevator } from './elevator';

export class Building {
  floors: Floor[] = [];
  elevators: Elevator[] = [];
  buildingElement: HTMLDivElement;
  floorsElement: HTMLDivElement;
  elevatorShaft: HTMLDivElement;

  constructor(num_of_floors: number, num_of_elevators: number) {
    this.buildingElement = document.createElement('div');
    this.floorsElement = document.createElement('div');
    this.elevatorShaft = document.createElement('div');

    this.buildingElement.className = 'building';
    this.elevatorShaft.className = 'elevatorShaft';
    this.floorsElement.className = 'floors';

    this.createElevators(num_of_elevators);
    this.createFloors(num_of_floors);

    this.appendElements();
  }

  private createElevators(num_of_elevators: number): void {
    for (let i = 0; i < num_of_elevators; i++) {
      const elevator = new Elevator(i);
      this.elevators.push(elevator);
      this.elevatorShaft.appendChild(elevator.elevatorElement);
    }
  }

  private createFloors(num_of_floors: number): void {
    for (let i = 0; i <= num_of_floors; i++) {
      const floor: Floor = new Floor(i, this.dispatchElevator);
      this.floors.push(floor);
      this.addLineFloorElements(floor, i, num_of_floors);
    }
  }

  private addLineFloorElements(
    floor: Floor,
    index: number,
    totalFloors: number,
  ): void {
    this.floorsElement.appendChild(floor.floorElement);
    if (index !== totalFloors) {
      this.floorsElement.appendChild(floor.lineElement);
    }
  }

  private appendElements(): void {
    const building: HTMLElement | null = document.getElementById('building');
    if (building) {
      building.appendChild(this.floorsElement);
      building.appendChild(this.elevatorShaft);
    }
  }

  private releaseFloor = (floorNumber: number): void => {
    this.floors[floorNumber].isButtonPressed = false;
    this.floors[floorNumber].buttonElement.style.color = 'hsla(0,0%,20%,1)';
  };

  private selectElevator = (
    floorNumber: number,
    currentTime: number,
  ): Elevator => {
    let minTime: number = Infinity;
    let elevatorID: number = 0;

    for (let elevator of this.elevators) {
      const currentMin: number =
        Math.abs(elevator.destination - floorNumber) * 500 +
        Settings[0].timeInFloor +
        (currentTime > elevator.timer ? 0 : elevator.timer - currentTime);

      if (currentMin < minTime) {
        minTime = currentMin;
        elevatorID = elevator.elevatorNumber;
      }
    }
    return this.elevators[elevatorID];
  };

  private dispatchElevator = (floorNumber: number): void => {
    let currentTime: number = Date.now();
    const selectedElevator: Elevator = this.selectElevator(
      floorNumber,
      currentTime,
    );
    let gap: number = Math.abs(selectedElevator.destination - floorNumber);
    selectedElevator.destination = floorNumber;

    if (currentTime > selectedElevator.timer) {
      selectedElevator.moveElevatorToFloor(floorNumber, this.releaseFloor);
      selectedElevator.timer = currentTime + (gap * 0.5 + 2) * 1000;
      this.floors[floorNumber].startTimer(gap * 0.5);
    } else {
      setTimeout(() => {
        selectedElevator.moveElevatorToFloor(floorNumber, this.releaseFloor);
      }, selectedElevator.timer - currentTime);
      selectedElevator.timer += (gap * 0.5 + 2) * 1000;
      this.floors[floorNumber].startTimer(
        gap * 0.5 + (selectedElevator.timer - currentTime) / 1000,
      );
    }
  };
}
