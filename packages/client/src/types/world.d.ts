declare type WefaElement = "water" | "earth" | "fire" | "air";

declare type PlantBadgeType =
  | "1st-plant"
  | "1st-flower"
  | "1st-fruit"
  | "1st-herb"
  | "1st-vegetable"
  | "all-plant-types";

declare type CreatureBadgeType =
  | "1st-creature"
  | "all-elements"
  | "1st-water-creature"
  | "1st-earth-creature"
  | "1st-fire-creature"
  | "1st-air-creature";

declare type BadgeType = PlantBadgeType | CreatureBadgeType | "early-adopter";

declare interface WefaBadge {
  id: BadgeType;
  name: string;
  description: string;
  element?: WefaElement;
  color?: string;
  Icon: string;
}

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

declare interface PlantDetails {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  zone?: PlantZone;
  type?: PlantType;
}

enum GrowthLevel {
  SEED,
  BUDDING,
  FLOWERING,
  RIPENING,
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

declare interface LocalProps {
  localId: string;
  isUploaded: boolean;
}

declare interface Asset {
  image: string; // CID
  model?: string; // CID
}

declare interface Timestamps {
  createdAt: number;
  updatedAt: number;
}

declare interface Creature extends Identity, Asset, Timestamps, LocalProps {
  id: `0x${string}`; // Address
  trainer: `0x${string}`; // Address
  spaceId: string; // Bytes32 ID
  care: Care;
  element: WefaElement;
}

declare interface Plant extends Identity, Timestamps, Asset, LocalProps {
  id?: string; // Address may
  localId: string;
  plantId: number;
  caretakerAddress: `0x${string}` | "local"; // Address
  care: Care;
  // spaceAddress: `0x${string}`; // Address
  // health: Health;
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

declare interface PlantResponseDetails {
  id: number;
  common_names: string[];
  scientific_name: string;
  structured_name: {
    genus: string;
    species: string;
  };
  taxonomy?: {
    kingdom: string;
    order: string;
    family: string;
    genus: string;
    class: string;
  };
  watering?: {
    min: number;
    max: number;
  };
  edible_parts: string[];
  wiki_image?: {
    value: string;
    citation: string;
    license_name: string;
    license_url: string;
  };
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
    plant_details: PlantResponseDetails;
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
      common_names: string[];
      scientific_name: string;
      structured_name: {
        genus: string;
        species: string;
      };
      taxonomy: {
        kingdom: string;
        order: string;
        family: string;
        genus: string;
        class: string;
      };
      watering: {
        min: number;
        max: number;
      };
      edible_parts: string[];
      wiki_image: {
        value: string;
        citation: string;
        license_name: string;
        license_url: string;
      };
    };
    probability: number;
    confirmed: boolean;
    common_names;
  }[];
  modifiers: string[];
  secret: string;
  fail_cause: null | string;
  countable: boolean;
  feedback: null | string;
  is_plant_probability: number;
  is_plant: boolean;
}
