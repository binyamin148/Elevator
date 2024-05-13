import { BuildingFactory } from './factoryBuilding';
import type { Building } from './building';

const building1: Building = BuildingFactory.getBuilding('building1');
const building2: Building = BuildingFactory.getBuilding('building2');
const building3: Building = BuildingFactory.getBuilding('building3');
