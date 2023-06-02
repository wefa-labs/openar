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

enum Size {
  MINI,
  SMALL,
  MEDIUM,
  LARGE,
}

enum ARStatus {
  ACTIVE,
  FROZEN,
}

declare interface Identity {
  name: string;
  description?: string;
  // createdAt?: number;
}

declare interface Asset {
  image: string; // CID
  model: string; // CID
}

declare interface Timestamps {
  createdAt: number;
  updatedAt: number;
}

declare interface Creature extends Identity, Asset, Timestamps {
  id: `0x${string}`; // Address
  trainer: `0x${string}`; // Address
  spaceId: string; // Bytes32 ID
  care: Care;
  element: WefaElement;
}

declare interface Plant extends Identity, Timestamps, Asset {
  id: `0x${string}`; // Address
  caretaker: `0x${string}`; // Address
  spaceId: `0x${string}`; // Address
  plantId: number;
  health: Health;
  care: Care;
}

declare interface TicTacToe {
  worldId: string;
  spaceId: string;
  gameId: string;
  name: string;
  board: (0 | 1 | 7)[];
  turn: number;
  currentPlayer: `0x${string}`; // Address
  winner: `0x${string}`; // Address
  createdAt: number;
}

declare interface ARCell {
  owner: `0x${string}`; // Address of user or gane system in control
  spaceId: string;
  x: number;
  y: number;
  values: string[];
}

// For Three.js Visualization
declare interface ARSpace {
  owner: `0x${string}`; // Address of user or gane system in control
  status: ARStatus;
  game?: "TicTacToe" | null; // This combines with status to determine color state
  name: string;
  position: number;
  description?: ?string;
  image: string; // CID,
  cells: ARCell[];
}

declare interface ARWorld {
  name: string;
  description?: ?string;
  image: string; // CID
  size: Size;
  status: ARStatus;
  spaces: ARSpace[];
  createdAt: number;
}

declare interface PlantResponse {
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

declare interface PlantHealth {
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
