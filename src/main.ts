import { Building } from './building';
import { Settings } from './settings';

class BuildingFactory {
  static getBuilding(numFloors: number, numElevators: number): Building {
      return new Building(numFloors, numElevators);
  }
}

const settings: Settings = new Settings();

const building1 : Building =  BuildingFactory.getBuilding(Settings.num_of_floors, Settings.num_of_elevators);
const building2 : Building =  BuildingFactory.getBuilding(4, 1);
const building3 : Building =  BuildingFactory.getBuilding(8, 2);
