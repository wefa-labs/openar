import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  // namespace: "openar",
  enums: {
    RoleEnum: ["O", "X"],
    StateEnum: ["Active", "Frozen"],
    SizeEnum: ["Mini", "Small", "Medium", "Large"],
  },
  tables: {
    Role: {
      keySchema: { user: "address", matchId: "bytes32" },
      schema: "RoleEnum",
    },
    State: {
      keySchema: { id: "bytes32" },
      schema: "StateEnum",
    },
    Size: {
      keySchema: { id: "bytes32" },
      schema: "SizeEnum",
    },
    Owner: {
      keySchema: { id: "bytes32" },
      schema: "address",
    },
    Identity: {
      keySchema: { id: "bytes32" },
      schema: {
        name: "string",
        description: "string",
        image: "string",
      },
    },
    Match: {
      keySchema: { gameId: "bytes32", matchId: "bytes32" },
      schema: {
        turnCount: "uint8",
        id: "bytes32",
        spacePosition: "uint8", // TODO: Integrate for 9 space tic tac toe, hardcoded to 0 for now.
        currentPlayer: "address",
        winner: "address",
        players: "address[]",
      },
    },
    Game: {
      keySchema: { gameId: "bytes32" },
      schema: {
        matchesPlayed: "uint8",
        spaceY: "uint32",
        spaceId: "bytes32",
        winner: "address",
        players: "address[]",
      },
    },
    Cell: {
      keySchema: { worldId: "bytes32", spaceId: "bytes32", x: "uint32", y: "uint32", z: "uint32" },
      schema: {
        values: "bytes32",
      },
    },
    Space: {
      keySchema: { worldID: "bytes32", spaceId: "bytes32" },
      schema: {
        id: "bytes32",
        position: "uint32",
        // z: "uint32",
      },
    },
    ARWorld: {
      keySchema: { worldId: "bytes32" },
      schema: {
        id: "bytes32",
        spaceCount: "uint32",
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
    GameCollectibleSystem: {
      name: "GameCollectible",
      openAccess: true,
    },
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    },
  ],
});
