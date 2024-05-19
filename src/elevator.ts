import { Settings } from './settings';

/**
 * Represents an elevator with movement functionality.
 */
export class Elevator {
  /** The number of the elevator. */
  elevatorNumber: number;

  /** The HTML image element representing the elevator. */
  elevatorElement: HTMLImageElement;

  /** The HTML audio element for the bell sound. */
  ringBell: HTMLAudioElement;

  /** The current floor the elevator is on. */
  currentFloor: number;

  /** The destination floor the elevator is moving to. */
  destination: number;

  /** The timer for elevator operations. */
  availability: number;

  /**
   * Creates an instance of Elevator.
   * @param elevatorNumber The number of the elevator.
   */
  constructor(elevatorNumber: number) {
    this.elevatorNumber = elevatorNumber;
    this.elevatorElement = this.createElevatorElement();
    this.ringBell = this.createRingBell();
    this.currentFloor = 0;
    this.destination = 0;
    this.availability = 0;
  }

  /**
   * Creates the elevator image element.
   * @returns The created image element.
   */
  private createElevatorElement(): HTMLImageElement {
    const element = document.createElement('img');
    element.src = './elv.png';
    element.classList.add('elevator');
    return element;
  }

  /**
   * Creates the audio element for the bell sound.
   * @returns The created audio element.
   */
  private createRingBell(): HTMLAudioElement {
    const audio = document.createElement('audio');
    audio.src = './ding.mp3';
    return audio;
  }

  /**
   * Moves the elevator to a target floor.
   * @param targetFloor The floor to move the elevator to.
   * @param releaseFloor Callback function to free a floor after the elevator stops.
   */
  public moveElevatorToFloor(
    targetFloor: number,
    releaseFloor: (floorNumber: number) => void,
  ): void {
    const currentFloor = this.currentFloor;

    const gap: number = Math.abs(currentFloor - targetFloor);

    this.animationMovementElevator(targetFloor);
    this.currentFloor = targetFloor;

    setTimeout(() => {
      this.playBell();
      const timeInFloor = Settings[0].timeInFloor;
      setTimeout(() => {
        this.stopBell();
        releaseFloor(targetFloor);
      }, timeInFloor);
    }, gap * 0.5 * 1000);
  }

  /**
   * Animates the movement of the elevator to a target floor.
   * @param targetFloor The floor to move the elevator to.
   */
  private animationMovementElevator(targetFloor: number): void {
    const travelTime = Math.abs(this.currentFloor - targetFloor);
    this.elevatorElement.style.transition = `transform ${
      travelTime * 0.5
    }s ease`;
    this.elevatorElement.style.transform = `translateY(${
      -targetFloor * 110
    }px)`;
  }

  /**
   * Plays the bell sound.
   */
  private playBell(): void {
    this.ringBell.play();
  }

  /**
   * Stops the bell sound.
   */
  private stopBell(): void {
    this.ringBell.pause();
    this.ringBell.currentTime = 0;
  }
}
