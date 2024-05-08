export class Floor {
  floorNumber: number;
  buttonPressed: boolean;
  buttonElement: HTMLElement;
  floorElement: HTMLElement;

  constructor(floorNumber: number) {
    this.floorNumber = floorNumber;
    this.buttonPressed = false;
    this.buttonElement = document.createElement('button');
    this.buttonElement.classList.add('metal', 'linear');
    this.buttonElement.innerText = floorNumber.toString();
    this.floorElement = document.createElement('div');
    this.floorElement.classList.add('floor');
    this.floorElement.style.bottom = `${floorNumber * 117}px`;
    this.floorElement.appendChild(this.buttonElement);
  }

  public getFloorElement(): HTMLElement {
    return this.floorElement;
  }
}
