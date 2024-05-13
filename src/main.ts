import { Building } from './building';
import { Settings } from './settings';

class BuildingFactory {
  static getBuilding(numFloors: number, numElevators: number): Building {
    return new Building(numFloors, numElevators);
  }
}

// const settings: Settings = new Settings();

const building1: Building = BuildingFactory.getBuilding(
  Settings[0].num_of_floors,
  Settings[0].num_of_elevators,
);
const building2: Building = BuildingFactory.getBuilding(
  Settings[1].num_of_floors,
  Settings[1].num_of_elevators,
);
const building3: Building = BuildingFactory.getBuilding(
  Settings[2].num_of_floors,
  Settings[2].num_of_elevators,
);
