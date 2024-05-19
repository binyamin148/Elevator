/**
 * Represents a floor in a building with a button and timer functionality.
 */
export class Floor {
  /** Indicates whether the button on this floor is pressed. */
  isButtonPressed: boolean = false;

  /** The number of the floor. */
  floorNumber: number;

  /** The HTML element representing the floor. */
  floorElement: HTMLDivElement;

  /** The HTML button element for this floor. */
  buttonElement: HTMLButtonElement;

  /** The HTML div element representing the line indicating the floor. */
  lineElement: HTMLDivElement;

  /** The HTML div element representing the timer display. */
  timerElement: HTMLDivElement;

  /**
   * Creates an instance of Floor.
   * @param floorNumber The number of the floor.
   * @param dispatchElevator Callback function to order an elevator.
   */
  constructor(
    floorNumber: number,
    dispatchElevator: (floorNumber: number) => void,
  ) {
    this.floorNumber = floorNumber;
    this.floorElement = this.createFloorContainer();
    this.buttonElement = this.createButtonElement();
    this.lineElement = this.createLineElement();
    this.timerElement = this.createTimerElement();

    this.initButtonListener(dispatchElevator);
    this.appendElements();
  }

  /**
   * Creates the container div for the floor.
   * @returns The created div element.
   */
  private createFloorContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('floor');
    container.id = this.floorNumber.toString();
    return container;
  }

  /**
   * Creates the button element for the floor.
   * @returns The created button element.
   */
  private createButtonElement(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'metal linear';
    button.textContent = this.floorNumber.toString();
    button.id = this.floorNumber.toString();
    return button;
  }

  /**
   * Creates the line element for the floor.
   * @returns The created div element.
   */
  private createLineElement(): HTMLDivElement {
    const lineElement = document.createElement('div');
    lineElement.className = 'blackLine';
    return lineElement;
  }

  /**
   * Creates the timer element for the floor.
   * @returns The created div element.
   */
  private createTimerElement(): HTMLDivElement {
    const counterElement = document.createElement('div');
    counterElement.classList.add('timer');
    return counterElement;
  }

  /**
   * Initializes the button click event listener.
   * @param orderElevator Callback function to order an elevator.
   */
  private initButtonListener(
    dispatchElevator: (floorNumber: number) => void,
  ): void {
    this.buttonElement.onclick = () => {
      if (!this.isButtonPressed) {
        dispatchElevator(this.floorNumber);
        this.isButtonPressed = true;
        this.buttonElement.style.color = 'green';
      }
    };
  }

  /**
   * Appends elements to the floor container.
   */
  private appendElements(): void {
    this.floorElement.appendChild(this.buttonElement);
    this.floorElement.appendChild(this.timerElement);
  }

  /**
   * Starts a timer for the floor.
   * @param duration The duration of the timer in seconds.
   */
  public startTimer(duration: number): void {
    const initialDelay = (duration % 1) * 1000;
    let remainingTime = Math.floor(duration);
    this.updateTimer(remainingTime);
    setTimeout(() => {
      const countdown = setInterval(() => {
        remainingTime--;
        this.updateTimer(remainingTime);
        if (remainingTime < 0) {
          clearInterval(countdown);
          this.timerElement.textContent = null;
        }
      }, 1000);
    }, initialDelay);
  }


  /**
   * Updates the timer display.
   * @param num The remaining time in seconds.
   */
  private updateTimer(num: number): void {
    this.timerElement.textContent = num.toString();
  }
}
