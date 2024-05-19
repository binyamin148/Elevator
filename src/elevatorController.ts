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

    for (let elevatorNumber of elevators) {
      const travelTime: number = this.calculateTravelTime(elevatorNumber, floorNumber, currentTime);

      if (travelTime < minTime) {
        minTime = travelTime;
        selectedElevator = elevatorNumber;
      }
    }

    return selectedElevator;
  }

  /**
   * Calculates the travel time for an elevator to reach the floor.
   * @param elevatorNumber The number of elevator object.
   * @param floorNumber The number of the floor calling the elevator.
   * @param currentTime The current time in milliseconds.
   * @returns The travel time in milliseconds.
   */
  static calculateTravelTime(elevatorNumber: Elevator, floorNumber: number, currentTime: number): number {
    const distanceTime: number = Math.abs(elevatorNumber.destination - floorNumber) * 500;
    const floorTime: number = Settings[0].timeInFloor;
    const waitingTime: number = currentTime > elevatorNumber.availability ? 0 : elevatorNumber.availability - currentTime;
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

    if (currentTime > selectedElevator.availability) {
      this.moveElevatorImmediately(selectedElevator, floorNumber, releaseFloor, gap, currentTime, floors);
    } else {
      this.scheduleElevatorMove(selectedElevator, floorNumber, releaseFloor, gap, currentTime, floors);
    }
  }

  /**
   * Moves the elevator immediately to the floor.
   * @param elevatorNumber The elevator number to move.
   * @param floorNumber The floor number to move the elevator to.
   * @param releaseFloor A function to release the floor.
   * @param gap The number of floors to travel.
   * @param currentTime The current time in milliseconds.
   * @param floors The array of floor objects in the building.
   */
  static moveElevatorImmediately(elevatorNumber: Elevator, floorNumber: number, releaseFloor: (floorNumber: number) => void, gap: number, currentTime: number, floors: Floor[]): void {
    elevatorNumber.moveElevatorToFloor(floorNumber, releaseFloor);
    elevatorNumber.availability = currentTime + (gap * 0.5 + 2) * 1000;
    floors[floorNumber].startTimer(gap * 0.5);
  }

  /**
   * Schedules the elevator to move to the floor at a later time.
   * @param elevatorNumber The elevator number to move.
   * @param floorNumber The floor number to move the elevator to.
   * @param releaseFloor A function to release the floor.
   * @param gap The number of floors to travel.
   * @param currentTime The current time in milliseconds.
   * @param floors The array of floor objects in the building.
   */
  static scheduleElevatorMove(elevatorNumber: Elevator, floorNumber: number, releaseFloor: (floorNumber: number) => void, gap: number, currentTime: number, floors: Floor[]): void {
    const remainingTime: number = elevatorNumber.availability - currentTime;

    setTimeout(() => {
      elevatorNumber.moveElevatorToFloor(floorNumber, releaseFloor);
    }, remainingTime);

    floors[floorNumber].startTimer(this.getRemainingTime(elevatorNumber.availability, currentTime));
    elevatorNumber.availability += (gap * 0.5 + 2) * 1000;
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
