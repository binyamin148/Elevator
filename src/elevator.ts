export class Elevator {
  elevatorNumber: number;
  elevatorElement: HTMLImageElement;

  constructor(elevatorNumber: number) {
    this.elevatorNumber = elevatorNumber;
    this.elevatorElement = this.createElevatorElement();
  }

  private createElevatorElement(): HTMLImageElement {
    const img = document.createElement('img');
    img.src = 'elv.png';
    img.classList.add('elevator-container');
    return img;
  }

  public getElevatorElement(): HTMLImageElement {
    return this.elevatorElement;
  }
}
