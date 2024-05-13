import { Building } from './building';
import { Settings } from './settings';

export class BuildingFactory {
  private static buildings: Map<string, Building> = new Map<string, Building>();

  private constructor() {}

  static getBuilding(buildingName: string): Building {
    const buildingSettings = Settings.find(
      (building) => building.name === buildingName,
    );

    if (!buildingSettings) {
      throw new Error(
        `Building with name ${buildingName} not found in settings.`,
      );
    }

    if (!BuildingFactory.buildings.has(buildingName)) {
      BuildingFactory.buildings.set(
        buildingName,
        new Building(
          buildingSettings.num_of_floors,
          buildingSettings.num_of_elevators,
        ),
      );
    }

    return BuildingFactory.buildings.get(buildingName)!;
  }
}
