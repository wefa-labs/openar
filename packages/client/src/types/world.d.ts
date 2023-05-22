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

declare interface Attributes {
  energy: number;
  power: number;
}

declare interface Identity {
  name: string;
  description?: ?string;
  createdAt: number;
}

declare interface Asset {
  image: string; // CID
  model: string; // CID
}

declare interface Critter extends Identity, Asset, HealthCare {
  id: `0x${string}`; // Address
  trainer: `0x${string}`; // Address
  attributes?: Attributes;
}

declare interface TicTacToe {
  mapId: string;
  gridId: string;
  gameId: string;
  name: string;
  board: (0 | 1 | 7)[];
  turn: number;
  currentPlayer: `0x${string}`; // Address
  winner: `0x${string}`; // Address
  createdAt: number;
}

declare interface Checker {
  mapId: string;
  gridId: string;
  gameId: string;
  name: string;
  board: (0 | 1 | 7)[];
  turn: number;
  currentPlayer: `0x${string}`; // Address
  winner: `0x${string}`; // Address
  createdAt: number;
}

enum Status {
  ACTIVE,
  FROZEN,
}

// For Three.js Visualization
declare interface Grid {
  status: Status;
  owner: `0x${string}`; // Address of user or gane system in control
  game: TicTacToe | Checkers | null;
  name: string;
  description?: ?string;
  image: string; // CID
  rangeX: [number, number];
  rangeY: [number, number];
  createdAt: number;
}

enum Size {
  MINI,
  SMALL,
  MEDIUM,
  LARGE,
}

declare interface Map {
  name: string;
  description?: ?string;
  image: string; // CID
  size: Size;
  status: Status;
  grids: Grid[];
  createdAt: number;
}

// The mini grid
