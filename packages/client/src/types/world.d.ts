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

declare interface Health {
  current: number;
  max: number;
  status: HealthStatus;
}

declare interface Care {
  checkedAt: number;
  growthLevel: GrowthLevel;
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
