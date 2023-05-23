import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "checkers",
  enums: {
    RoleEnum: ["Red", "Black"],
  },
  tables: {
    Role: {
      keySchema: { user: "address", gameId: "bytes32" },
      schema: "RoleEnum",
    },
    Identity: {
      keySchema: { id: "bytes32" },
      schema: {
        name: "string",
      },
    },
    Game: {
      keySchema: { gameId: "bytes32", gridId: "bytes32" },
      schema: {
        turnCount: "uint8",
        id: "bytes32",
        currentPlayer: "address",
        winner: "address",
        players: "address[2]",
        board: "uint8[64]",
      },
    },
    // SANITY CHECK
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
  },
  systems: {
    GameStartSystem: {
      name: "GameStart",
      openAccess: true,
    },
    GameMoveSystem: {
      name: "GameMove",
      openAccess: true,
    },
    // SANITY CHECK
    IncrementSystem: {
      name: "Increment",
      openAccess: true,
    },
  },
});
