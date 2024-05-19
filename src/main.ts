import { BuildingFactory } from './buildingFactory';
import type { Building } from './building';

// Get instances of buildings using the BuildingFactory
const building1: Building = BuildingFactory.getBuilding('building1');
const building2: Building = BuildingFactory.getBuilding('building2');
const building3: Building = BuildingFactory.getBuilding('building3');
