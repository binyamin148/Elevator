import { Settings } from './settings';

export class Elevator {
  elevatorNumber: number;
  elevatorElement: HTMLImageElement;
  ringBell: HTMLAudioElement;
  currentFloor: number;
  destination: number;
  timer: number;

  constructor(elevatorNumber: number) {
    this.elevatorNumber = elevatorNumber;
    this.elevatorElement = this.createElevatorElement();
    this.ringBell = this.createRingBell();
    this.currentFloor = 0;
    this.destination = 0;
    this.timer = 0;
  }

  private createElevatorElement(): HTMLImageElement {
    const element = document.createElement('img');
    element.src = './elv.png';
    element.classList.add('elevator');
    return element;
  }

  private createRingBell(): HTMLAudioElement {
    const audio = document.createElement('audio');
    audio.src = './ding.mp3';
    return audio;
  }

  public moveElevatorToFloor(
    targetFloor: number,
    freeFloor: (floorNumber: number) => void,
  ): void {
    const currentFloor = this.currentFloor;

    const gap: number = Math.abs(currentFloor - targetFloor);

    this.animationMovementElevator(targetFloor);
    this.currentFloor = targetFloor;

    setTimeout(() => {
      this.playBell();
      const timeInFloor = Settings.timeInFloor;
      setTimeout(() => {
        this.stopBell();
        freeFloor(targetFloor);
      }, timeInFloor);
    }, gap * 0.5 * 1000)
  }

  private animationMovementElevator(targetFloor: number): void {
    const travelTime = Math.abs(this.currentFloor - targetFloor);
    this.elevatorElement.style.transition = `transform ${
      travelTime * 0.5
    }s ease`;
    this.elevatorElement.style.transform = `translateY(${
      -targetFloor * 110
    }px)`;
  }

  private playBell(): void {
    this.ringBell.play();
  }

  private stopBell(): void {
    this.ringBell.pause();
    this.ringBell.currentTime = 0;
  }
}
