export class Floor {
  isInActive: boolean = false;
  floorNumber: number;
  floorElement: HTMLDivElement;
  buttonElement: HTMLButtonElement;
  lineElement: HTMLDivElement;
  counterElement: HTMLDivElement;

  constructor(
    floorNumber: number,
    orderElevator: (floorNumber: number) => void,
  ) {
    this.floorNumber = floorNumber;
    this.floorElement = this.createFloorContainer();
    this.buttonElement = this.createButtonElement();
    this.lineElement = this.createLineElement();
    this.counterElement = this.createCounterElement();

    this.initButtonListener(orderElevator);
    this.appendElements();
  }

  private createFloorContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('floor');
    container.id = this.floorNumber.toString();
    return container;
  }

  private createButtonElement(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'metal linear';
    button.textContent = this.floorNumber.toString();
    button.id = this.floorNumber.toString();
    return button;
  }

  private createLineElement(): HTMLDivElement {
    const lineElement = document.createElement('div');
    lineElement.className = 'blackLine';
    return lineElement;
  }

  private createCounterElement(): HTMLDivElement {
    const counterElement = document.createElement('div');
    counterElement.classList.add('timer');
    return counterElement;
  }

  private initButtonListener(
    orderElevator: (floorNumber: number) => void,
  ): void {
    this.buttonElement.onclick = () => {
      if (!this.isInActive) {
        orderElevator(this.floorNumber);
        this.isInActive = true;
        this.buttonElement.style.color = 'green';
      }
    };
  }

  private appendElements(): void {
    this.floorElement.appendChild(this.buttonElement);
    this.floorElement.appendChild(this.counterElement);
  }

  public startCounter(duration: number): void {
    let initialDelay = duration % 1;
    setTimeout(() => {
      let remainingTime = Math.floor(duration);
      this.updateCounter(remainingTime);

      const countdown = setInterval(() => {
        remainingTime--;
        this.updateCounter(remainingTime);
        if (remainingTime <= 0) {
          clearInterval(countdown);
          this.counterElement.textContent = null;
        }
      }, 1000);
    }, initialDelay * 1000);
  }

  private updateCounter(num: number): void {
    this.counterElement.textContent = num.toString();
  }
}
