// enum WefaElement {
//   WATER = "water",
//   EARTH = "earth",
//   FIRE = "fire",
//   AIR = "air",
// }

declare type WefaElement = "water" | "earth" | "fire" | "air";

enum PlantType {
  FLOWER = "flower",
  FRUIT = "fruit",
  VEGETABLE = "vegetable",
  HERB = "herb",
}

enum PlantZone {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  ELEVEN,
  TWELVE,
  THIRTEEN,
}

enum GrowthLevel {
  SEED,
  BUDDING,
  FLOWERING,
  RIPENING,
}

enum HealthStatus {
  HEALTHY,
  SICK,
  DEAD,
}

enum Planet {
  EARTH,
  MARS,
}

enum Action {
  GARDEN_PLANTING,
}

enum Status {
  ACTIVE,
  INACTIVE,
  DEACTIVATED,
}

declare interface Health {
  current: number;
  max: number;
  status: HealthStatus;
}

declare interface Care {
  checkedAt: number;
  growthLevel: GrowthLevel;
}

declare interface Bio {
  type: PlantType;
  zone: PlantZone;
}

declare interface Effect {
  name: string;
  description: string;
  type: string;
  value: number;
}

declare interface Attributes {
  energy: number;
  power: number;
}

declare interface Timestamps {
  createdAt: number;
  updatedAt: number;
}

declare interface Identity {
  name: string;
  purpose?: ?string;
  description?: ?string;
  metadata: string; // CID
  elements: WefaElement[];
}

declare interface Asset {
  image: string; // CID
  model: string; // CID
}

declare interface HealthCare {
  health?: Health;
  care?: Care;
}

declare interface Critter extends Identity, Timestamps, Asset, HealthCare {
  id: `0x${string}`; // Address
  trainer: `0x${string}`; // Address
  space: `0x${string}`; // Address
  attributes?: Attributes;
  effect?: Effect;
}

declare interface Plant extends Identity, Timestamps, Asset {
  id: `0x${string}`; // Address
  caretaker: `0x${string}`; // Address
  space: `0x${string}`; // Address
  plantId: number;
  health: Health;
  care: Care;
}

declare interface Member extends Timestamps {
  id: `0x${string}`; // Address
  status: Status;
  plantsAdded: number;
  leader: boolean;
}

declare interface Space extends Identity, Timestamps {
  id: `0x${string}`; // Address
  world: `0x${string}`; // Address
  private: boolean;
  energy: number;
  zipcode: number;
  country: string;
  planet: Planet;
  status: Status;
  plants: Plant[];
  actions: Action[];
  members: Member[];
}

interface PlantResponse {
  id: number;
  custom_id?: null | string;
  meta_data: {
    latitude: null | number;
    longitude: null | number;
    date: string;
    datetime: string;
  };
  uploaded_datetime: number;
  finished_datetime: number;
  images: {
    file_name: string;
    url: string;
  }[];
  suggestions: {
    id: number;
    plant_name: string;
    plant_details: {
      language: "en";
      scientific_name: string;
      structured_name: {
        genus: string;
        species: string;
      };
    };
    probability: number;
    confirmed: boolean;
  }[];
  modifiers: any[];
  secret: string;
  fail_cause: null | string;
  countable: true | false;
  feedback: null | string;
  is_plant_probability: number;
  is_plant: boolean;
}

interface PlantHealth {
  id: number;
  custom_id: null | string;
  meta_data: {
    latitude: null | number;
    longitude: null | number;
    date: string;
    datetime: string;
  };
  uploaded_datetime: number;
  finished_datetime: number;
  images: {
    file_name: string;
    url: string;
  }[];
  suggestions: {
    id: number;
    plant_name: string;
    plant_details: {
      language: string;
      scientific_name: string;
      structured_name: {
        genus: string;
        species: string;
      };
    };
    probability: number;
    confirmed: boolean;
  }[];
  modifiers: string[];
  secret: string;
  fail_cause: null | string;
  countable: boolean;
  feedback: null | string;
  is_plant_probability: number;
  is_plant: boolean;
}
