# Elevator Simulation

This project simulates an elevator system in a building, written in TypeScript.

## Overview

The project consists of the following main components:

- **Elevator**: Represents an elevator with movement functionality.
- **Floor**: Represents a floor in the building with a button and timer functionality.
- **Building**: Represents a building with floors and elevators.
- **BuildingFactory**: Factory class to create and manage building instances.
- **Settings**: Contains configurations for different buildings.

## Components

### Elevator

- **Properties**:
  - `elevatorNumber`: The number of the elevator.
  - `elevatorElement`: The HTML image element representing the elevator.
  - `ringBell`: The HTML audio element for the bell sound.
  - `currentFloor`: The current floor the elevator is on.
  - `destination`: The destination floor the elevator is moving to.
  - `timer`: The timer for elevator operations.
- **Methods**:
  - `moveElevatorToFloor(targetFloor: number, freeFloor: (floorNumber: number) => void)`: Moves the elevator to a target floor.
  - `playBell()`: Plays the bell sound.
  - `stopBell()`: Stops the bell sound.

### Floor

- **Properties**:
  - `isButtonPressed`: Indicates whether the button on this floor is pressed.
  - `floorNumber`: The number of the floor.
  - `floorElement`: The HTML div element representing the floor.
  - `buttonElement`: The HTML button element for this floor.
  - `lineElement`: The HTML div element representing the line indicating the floor.
  - `timerElement`: The HTML div element representing the timer display.
- **Methods**:
  - `startTimer(duration: number)`: Starts a timer for the floor.

### Building

- **Properties**:
  - `floors`: An array of floor objects in the building.
  - `elevators`: An array of elevator objects in the building.
  - `buildingElement`: The HTML div element representing the building.
  - `floorsElement`: The HTML div element containing floor elements.
  - `elevatorShaft`: The HTML div element representing the elevator shaft.
- **Methods**:
  - `releaseFloor(floorNumber: number)`: Releases a floor by resetting its button status.
  - `selectElevator(floorNumber: number, currentTime: number)`: Selects an elevator to respond to a floor call.
  - `dispatchElevator(floorNumber: number)`: Dispatches an elevator to a floor call.

### BuildingFactory

- **Methods**:
  - `getBuilding(buildingName: string)`: Retrieves a building instance by name.

### Settings

- Contains configurations for different buildings.
