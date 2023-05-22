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
      schema: {
        name: "string",
        createdAt: "uint256",
      },
    },
    Match: {
      schema: {
        board: "uint8[9]",
        winner: "address",
        currentPlayer: "bytes32",
        turnCount: "uint8",
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
