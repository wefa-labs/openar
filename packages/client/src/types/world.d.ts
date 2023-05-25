declare interface Identity {
  name: string;
  description?: string;
  createdAt?: number;
}

declare interface Asset {
  image: string; // CID
  model: string; // CID
}

declare interface Critter extends Identity, Asset {
  id: `0x${string}`; // Address
  owner: `0x${string}`; // Address
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

declare interface Checkers {
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

declare interface OpenARCell {
  owner: `0x${string}`; // Address of user or gane system in control
  spaceId: string;
  x: number;
  y: number;
  values: string[];
}

enum Status {
  ACTIVE,
  FROZEN,
}

// For Three.js Visualization
declare interface OpenARWorld {
  owner: `0x${string}`; // Address of user or gane system in control
  status: Status;
  game?: "TicTacToe" | "Checkers" | null; // This combines with status to determine color state
  name: string;
  position: number;
  description?: ?string;
  image: string; // CID,
  cells: OpenARCell[];
}

enum Size {
  MINI,
  SMALL,
  MEDIUM,
  LARGE,
}

declare interface OpenARRealm {
  name: string;
  description?: ?string;
  image: string; // CID
  size: Size;
  status: Status;
  spaces: OpenARSpace[];
  createdAt: number;
}
