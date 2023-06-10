declare type WefaElement = "WATER" | "EARTH" | "FIRE" | "AIR";

declare type BadgeType = PlantBadgeType | CreatureBadgeType | "early-adopter";

declare interface WefaBadge {
  id: BadgeType;
  name: string;
  description: string;
  element?: WefaElement;
  color?: string;
  Icon: string;
}

declare enum GrowthLevel {
  SEED,
  BUDDING,
  FLOWERING,
  RIPENING,
}

declare enum Size {
  MINI,
  SMALL,
  MEDIUM,
  LARGE,
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

declare interface Care {
  growthLevel: GrowthLevel;
  checkedAt: number;
}
