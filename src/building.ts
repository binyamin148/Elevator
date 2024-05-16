import { Floor } from './floor';
import { Elevator } from './elevator';
import { ElevatorController } from './elevatorController';

/**
 * Represents a building with floors and elevators.
 */
export class Building {
  /** An array of floor objects in the building. */
  floors: Floor[] = [];

  /** An array of elevator objects in the building. */
  elevators: Elevator[] = [];

  /** The HTML div element representing the building. */
  buildingElement: HTMLDivElement;

  /** The HTML div element containing floor elements. */
  floorsElement: HTMLDivElement;

  /** The HTML div element representing the elevator shaft. */
  elevatorShaft: HTMLDivElement;

  /**
   * Creates an instance of Building.
   * @param num_of_floors The number of floors in the building.
   * @param num_of_elevators The number of elevators in the building.
   */
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

  /**
   * Creates elevator objects and appends them to the elevator shaft.
   * @param num_of_elevators The number of elevators to create.
   */
  private createElevators(num_of_elevators: number): void {
    for (let i = 0; i < num_of_elevators; i++) {
      const elevator = new Elevator(i);
      this.elevators.push(elevator);
      this.elevatorShaft.appendChild(elevator.elevatorElement);
    }
  }

  /**
   * Creates floor objects and appends them to the building.
   * @param num_of_floors The number of floors to create.
   */
  private createFloors(num_of_floors: number): void {
    for (let i = 0; i <= num_of_floors; i++) {
      const floor: Floor = new Floor(i, this.dispatchElevator);
      this.floors.push(floor);
      this.addLineFloorElements(floor, i, num_of_floors);
    }
  }

  /**
   * Adds floor and line elements to the building.
   * @param floor The floor object to add.
   * @param index The index of the floor.
   * @param totalFloors The total number of floors.
   */
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

  /**
   * Appends building elements to the DOM.
   */
  private appendElements(): void {
    const building: HTMLElement | null = document.getElementById('building');
    if (building) {
      building.appendChild(this.floorsElement);
      building.appendChild(this.elevatorShaft);
    }
  }

  /**
   * Releases a floor by resetting its button status.
   * @param floorNumber The number of the floor to release.
   */
  private releaseFloor = (floorNumber: number): void => {
    this.floors[floorNumber].isButtonPressed = false;
    this.floors[floorNumber].buttonElement.style.color = 'hsla(0,0%,20%,1)';
  };

  /**
   * Dispatches an elevator to a floor call.
   * @param floorNumber The number of the floor calling the elevator.
   */
  private dispatchElevator = (floorNumber: number): void => {
    ElevatorController.dispatchElevator(
      floorNumber,
      this.elevators,
      this.floors,
      this.releaseFloor,
    );
  };
}
