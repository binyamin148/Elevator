import { Building } from './building';

const building = new Building(10);
const buildingContainer = document.getElementById('building-container');

if (buildingContainer) {
  building.renderBuilding(buildingContainer);
}
