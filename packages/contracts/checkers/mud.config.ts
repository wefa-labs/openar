import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  deploysDirectory: "../client/muk",
  namespace: "checkers",
  enums: {
    RoleEnum: ["O", "X"],
  },
  tables: {
    Role: {
      schema: "RoleEnum",
    },
    PlayerID: {
      keySchema: { user: "address", gridId: "bytes32" },
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
        board: "uint8[64]",
        players: "bytes32[2]",
        winner: "address",
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
