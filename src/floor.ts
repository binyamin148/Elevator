export class Floor {
  isButtonPressed: boolean = false;
  floorNumber: number;
  floorElement: HTMLDivElement;
  buttonElement: HTMLButtonElement;
  lineElement: HTMLDivElement;
  timerElement: HTMLDivElement;

  constructor(
    floorNumber: number,
    orderElevator: (floorNumber: number) => void,
  ) {
    this.floorNumber = floorNumber;
    this.floorElement = this.createFloorContainer();
    this.buttonElement = this.createButtonElement();
    this.lineElement = this.createLineElement();
    this.timerElement = this.createTimerElement();

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

  private createTimerElement(): HTMLDivElement {
    const counterElement = document.createElement('div');
    counterElement.classList.add('timer');
    return counterElement;
  }

  private initButtonListener(
    orderElevator: (floorNumber: number) => void,
  ): void {
    this.buttonElement.onclick = () => {
      if (!this.isButtonPressed) {
        orderElevator(this.floorNumber);
        this.isButtonPressed = true;
        this.buttonElement.style.color = 'green';
      }
    };
  }

  private appendElements(): void {
    this.floorElement.appendChild(this.buttonElement);
    this.floorElement.appendChild(this.timerElement);
  }

  public startTimer(duration: number): void {
    let initialDelay = duration % 1;
    setTimeout(() => {
      let remainingTime = Math.floor(duration);
      this.updateTimer(remainingTime);

      const countdown = setInterval(() => {
        remainingTime--;
        this.updateTimer(remainingTime);
        if (remainingTime <= 0) {
          clearInterval(countdown);
          this.timerElement.textContent = null;
        }
      }, 1000);
    }, initialDelay * 1000);
  }

  private updateTimer(num: number): void {
    this.timerElement.textContent = num.toString();
  }
}
