import type { Elevator } from './elevator';
import { Settings } from './settings';
import type { Floor } from './floor';

export class ElevatorController {
  /**
   * Selects an elevator to respond to a floor call.
   * @param floorNumber The number of the floor calling the elevator.
   * @param currentTime The current time in milliseconds.
   * @param elevators The array of elevator objects in the building.
   * @returns The selected elevator.
   */
  static selectElevator(
    floorNumber: number,
    currentTime: number,
    elevators: Elevator[],
  ): Elevator {
    let minTime: number = Infinity;
    let elevatorID: number = 0;

    for (let elevator of elevators) {
      const currentMin: number =
        Math.abs(elevator.destination - floorNumber) * 500 +
        Settings[0].timeInFloor +
        (currentTime > elevator.timer ? 0 : elevator.timer - currentTime);

      if (currentMin < minTime) {
        minTime = currentMin;
        elevatorID = elevator.elevatorNumber;
      }
    }
    return elevators[elevatorID];
  }

  /**
   * Dispatches an elevator to a floor call.
   * @param floorNumber The number of the floor calling the elevator.
   * @param elevators The array of elevator objects in the building.
   * @param floors The array of floor objects in the building.
   * @param releaseFloor A function to release a floor.
   */
  static dispatchElevator(
    floorNumber: number,
    elevators: Elevator[],
    floors: Floor[],
    releaseFloor: (floorNumber: number) => void,
  ): void {
    const currentTime: number = Date.now();
    const selectedElevator: Elevator = this.selectElevator(
      floorNumber,
      currentTime,
      elevators,
    );
    const gap: number = Math.abs(selectedElevator.destination - floorNumber);
    selectedElevator.destination = floorNumber;

    if (currentTime > selectedElevator.timer) {
      selectedElevator.moveElevatorToFloor(floorNumber, releaseFloor);
      selectedElevator.timer = currentTime + (gap * 0.5 + 2) * 1000;
      floors[floorNumber].startTimer(gap * 0.5);
    } else {
      setTimeout(() => {
        selectedElevator.moveElevatorToFloor(floorNumber, releaseFloor);
      }, selectedElevator.timer - currentTime);
      floors[floorNumber].startTimer(
        this.getRemainingTime(selectedElevator.timer, currentTime),
      );
      selectedElevator.timer += (gap * 0.5 + 2) * 1000;
    }
  }

  /**
   * Calculates the remaining time until an event.
   * @param timer The target time of the event.
   * @param currentTime The current time in milliseconds.
   * @returns The remaining time in seconds.
   */
  static getRemainingTime(timer: number, currentTime: number): number {
    return (timer - currentTime) / 1000;
  }
}
