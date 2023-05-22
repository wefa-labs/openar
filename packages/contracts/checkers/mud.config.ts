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
        createdAt: "uint256",
        name: "string",
      },
    },
    Match: {
      keySchema: { id: "bytes32", gridId: "bytes32" },
      schema: {
        turnCount: "uint8",
        currentPlayer: "bytes32",
        winner: "address",
        board: "uint8[64]",
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
