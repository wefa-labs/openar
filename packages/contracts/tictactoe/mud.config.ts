import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "tictactoe",
  enums: {
    RoleEnum: ["O", "X"],
  },
  tables: {
    Role: {
      keySchema: { user: "address", matchId: "bytes32" },
      schema: "RoleEnum",
    },
    Identity: {
      keySchema: { id: "bytes32" },
      schema: {
        name: "string",
      },
    },
    Match: {
      keySchema: { matchId: "bytes32", position: "uint8" },
      schema: {
        turnCount: "uint8",
        id: "bytes32",
        gridPosition: "uint8", // TODO: Integrate for 9 grid tic tac toe, hardcoded to 0 for now.
        gridId: "bytes32",
        currentPlayer: "address",
        winner: "address",
        players: "address[2]",
        board: "uint8[9]",
      },
    },
    Game: {
      keySchema: { gameId: "bytes32", gridId: "bytes32" },
      schema: {
        winner: "address",
        matchesPlayed: "uint8",
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
