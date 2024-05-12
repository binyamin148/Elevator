import { Settings } from './settings';

export class Elevator {
  elevatorNumber: number;
  elevatorElement: HTMLImageElement;
  ringBell: HTMLAudioElement;
  currentFloor: number;
  destination: number;
  timer: number;
  isElevatorMoving: boolean;

  constructor(elevatorNumber: number) {
    this.elevatorNumber = elevatorNumber;
    this.elevatorElement = this.createElevatorElement();
    this.ringBell = this.createRingBell();
    this.currentFloor = 0;
    this.destination = 0;
    this.timer = 0;
    this.isElevatorMoving = false;
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

  public moveToFloor(
    targetFloor: number,
    freeFloor: (floorNumber: number) => void,
  ): void {
    const gap: number = Math.abs(this.currentFloor - targetFloor);

    this.animationMovementElevator(targetFloor);
    this.currentFloor = targetFloor;

    this.isElevatorMoving = true; 

    setTimeout(() => {
      this.playBell();
      const timeInFloor = Settings.timeInFloor;
      setTimeout(() => {
        this.stopBell();
        freeFloor(targetFloor);
        this.isElevatorMoving = false; 
      }, timeInFloor);
    }, gap * 0.5 * 1000);

    setTimeout(() => {
        this.isElevatorMoving = false;
    }, 2000);
  }

  private animationMovementElevator(targetFloor: number): void {
    if (!this.isElevatorMoving) {      
      const travelTime = Math.abs(this.currentFloor - targetFloor);
      this.elevatorElement.style.transition = `transform ${travelTime * 0.5}s ease`;
      this.elevatorElement.style.transform = `translateY(${-targetFloor * 110}px)`;
    }
  }

  private playBell(): void {
    this.ringBell.play();
  }

  private stopBell(): void {
    this.ringBell.pause();
    this.ringBell.currentTime = 0;
  }
}
