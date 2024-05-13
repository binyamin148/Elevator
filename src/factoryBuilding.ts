import { Building } from './building';
import { Settings } from './settings';

/**
 * Factory class to create and manage building instances.
 */
export class BuildingFactory {
  /** A map to store building instances with their names as keys. */
  private static buildings: Map<string, Building> = new Map<string, Building>();

  /** Prevents creating instances of this class. */
  private constructor() {}

  /**
   * Retrieves a building instance by name.
   * If the building instance doesn't exist, creates a new one based on settings.
   * @param buildingName The name of the building.
   * @returns The building instance.
   * @throws Error if building with the specified name is not found in settings.
   */
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
