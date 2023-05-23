declare interface Identity {
  name: string;
  description?: ?string;
  createdAt: number;
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
  owner: `0x${string}`; // Address of user or gane system in control
  status: Status;
  game: "TicTacToe" | "Checkers" | null; // This combines with status to determine color state
  name: string;
  position: number;
  description?: ?string;
  image: string; // CID
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

// Generate mock data
const gridData: Grid[] = [
  {
    owner: "0x1234567890abcdef",
    status: Status.ACTIVE,
    game: "TicTacToe",
    name: "Grid 1",
    position: 0,
    description: "Description 1",
    image: "CID1",
  },
  {
    owner: "0xfedcba0987654321",
    status: Status.FROZEN,
    game: "TicTacToe",
    name: "Grid 2",
    position: 1,
    image: "CID2",
  },
  {
    owner: "0xabcdef1234567890",
    status: Status.ACTIVE,
    game: null,
    name: "Grid 3",
    position: 2,
    description: null,
    image: "CID3",
  },
  {
    owner: "0xabcdef1234567890",
    status: Status.ACTIVE,
    game: "Checkers",
    name: "Grid 4",
    position: 3,
    description: "Description 4",
    image: "CID3",
  },
];
