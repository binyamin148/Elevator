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
  static selectElevator(floorNumber: number, currentTime: number, elevators: Elevator[]): Elevator {
    let selectedElevator: Elevator = elevators[0];
    let minTime: number = Date.now();

    for (let elevator of elevators) {
      const travelTime: number = this.calculateTravelTime(elevator, floorNumber, currentTime);

      if (travelTime < minTime) {
        minTime = travelTime;
        selectedElevator = elevator;
      }
    }

    return selectedElevator;
  }

  /**
   * Calculates the travel time for an elevator to reach the floor.
   * @param elevator The elevator object.
   * @param floorNumber The number of the floor calling the elevator.
   * @param currentTime The current time in milliseconds.
   * @returns The travel time in milliseconds.
   */
  static calculateTravelTime(elevator: Elevator, floorNumber: number, currentTime: number): number {
    const distanceTime: number = Math.abs(elevator.destination - floorNumber) * 500;
    const floorTime: number = Settings[0].timeInFloor;
    const waitingTime: number = currentTime > elevator.timer ? 0 : elevator.timer - currentTime;
    return distanceTime + floorTime + waitingTime;
  }

  /**
   * Dispatches an elevator to a floor call.
   * @param floorNumber The number of the floor calling the elevator.
   * @param elevators The array of elevator objects in the building.
   * @param floors The array of floor objects in the building.
   * @param releaseFloor A function to release a floor.
   */
  static dispatchElevator(floorNumber: number, elevators: Elevator[], floors: Floor[], releaseFloor: (floorNumber: number) => void): void {
    const currentTime: number = Date.now();
    const selectedElevator: Elevator = this.selectElevator(floorNumber, currentTime, elevators);
    const gap: number = Math.abs(selectedElevator.destination - floorNumber);

    selectedElevator.destination = floorNumber;

    if (currentTime > selectedElevator.timer) {
      this.moveElevatorImmediately(selectedElevator, floorNumber, releaseFloor, gap, currentTime, floors);
    } else {
      this.scheduleElevatorMove(selectedElevator, floorNumber, releaseFloor, gap, currentTime, floors);
    }
  }

  /**
   * Moves the elevator immediately to the floor.
   * @param elevator The elevator to move.
   * @param floorNumber The floor number to move the elevator to.
   * @param releaseFloor A function to release the floor.
   * @param gap The number of floors to travel.
   * @param currentTime The current time in milliseconds.
   * @param floors The array of floor objects in the building.
   */
  static moveElevatorImmediately(elevator: Elevator, floorNumber: number, releaseFloor: (floorNumber: number) => void, gap: number, currentTime: number, floors: Floor[]): void {
    elevator.moveElevatorToFloor(floorNumber, releaseFloor);
    elevator.timer = currentTime + (gap * 0.5 + 2) * 1000;
    floors[floorNumber].startTimer(gap * 0.5);
  }

  /**
   * Schedules the elevator to move to the floor at a later time.
   * @param elevator The elevator to move.
   * @param floorNumber The floor number to move the elevator to.
   * @param releaseFloor A function to release the floor.
   * @param gap The number of floors to travel.
   * @param currentTime The current time in milliseconds.
   * @param floors The array of floor objects in the building.
   */
  static scheduleElevatorMove(elevator: Elevator, floorNumber: number, releaseFloor: (floorNumber: number) => void, gap: number, currentTime: number, floors: Floor[]): void {
    const remainingTime: number = elevator.timer - currentTime;

    setTimeout(() => {
      elevator.moveElevatorToFloor(floorNumber, releaseFloor);
    }, remainingTime);

    floors[floorNumber].startTimer(this.getRemainingTime(elevator.timer, currentTime));
    elevator.timer += (gap * 0.5 + 2) * 1000;
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
