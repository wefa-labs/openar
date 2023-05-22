import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "tictactoe",
  enums: {
    RoleEnum: ["O", "X"],
  },
  tables: {
    // Test Purposes
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    Role: {
      keySchema: { user: "address", gameId: "bytes32" },
      schema: "RoleEnum",
    },
    Identity: {
      keySchema: { id: "bytes32" },
      schema: {
        createdAt: "uint256",
        name: "string",
      },
    },
    Match: {
      keySchema: { id: "bytes32", gridId: "bytes32" },
      schema: {
        currentPlayer: "bytes32",
        turnCount: "uint8",
        winner: "address",
        board: "uint8[9]",
      },
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
