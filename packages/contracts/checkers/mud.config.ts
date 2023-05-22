import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "checkers",
  enums: {
    RoleEnum: ["Red", "Black"],
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
        name: "string",
        createdAt: "uint256",
      },
    },
    Match: {
      keySchema: { id: "bytes32" },
      schema: {
        board: "uint8[64]",
        winner: "address",
        currentPlayer: "bytes32",
        turnCount: "uint8",
      },
    },
  },
  systems: {
    // Test Purposes
    IncrementSystem: {
      name: "Increment",
      openAccess: true,
    },
    GameInitSystem: {
      name: "GameInit",
      openAccess: true,
    },
    GameMoveSystem: {
      name: "GameMove",
      openAccess: true,
    },
  },
});
