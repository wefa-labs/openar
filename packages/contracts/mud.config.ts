import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "tictactoe",
  enums: {
    RoleEnum: ["X", "O"],
  },
  tables: {
    Role: {
      schema: "RoleEnum",
    },
    PlayerID: {
      keySchema: { user: "address", gameId: "bytes32" },
      schema: "bytes32",
    },
    Identity: {
      schema: {
        name: "string",
        createdAt: "uint256",
      },
    },
    Match: {
      schema: {
        board: "uint8[9]",
        players: "bytes32[2]",
        winner: "address",
        trophyClaimed: "bool",
        currentPlayer: "bytes32",
        turnCount: "uint8",
      },
    },
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
  },
  systems: {
    GameInitSystem: {
      name: "GameInit",
      openAccess: true,
    },
    GameMoveSystem: {
      name: "GameMove",
      openAccess: true,
    },
    IncrementSystem: {
      name: "Increment",
      openAccess: true,
    },
  },
});
