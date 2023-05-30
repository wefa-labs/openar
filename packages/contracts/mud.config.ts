import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  // namespace: "openar",
  enums: {
    RoleEnum: ["O", "X"],
    StateEnum: ["Active", "Frozen"],
    SizeEnum: ["Mini", "Small", "Medium", "Large"],
    ElementEnum: ["WATER", "EARTH", "FIRE", "AIR"],
    GrowthLevelEnum: ["SEED", "BUDDING", "FLOWERING", "RIPENING"],
  },
  tables: {
    State: "StateEnum",
    Size: "SizeEnum",
    Owner: "address",
    Element: "ElementEnum",
    Role: {
      keySchema: { user: "address", matchId: "bytes32" },
      schema: "RoleEnum",
    },
    Asset: {
      schema: {
        image: "string",
        model: "string",
      },
    },
    Care: {
      schema: {
        growthLevel: "GrowthLevelEnum",
        checkedAt: "uint256",
      },
    },
    Identity: {
      keySchema: { id: "bytes32" },
      schema: {
        name: "string",
        description: "string",
        image: "string",
        // createdAt: "uint256",
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
    CreatureSystem: {
      openAccess: true,
    },
    PlantSystem: {
      openAccess: true,
    },
    SpaceSystem: {
      openAccess: false,
      accessList: ["GameStartSystem", "GameMoveSystem"],
    },
    CellSystem: {
      openAccess: false,
      accessList: ["GameStartSystem", "GameMoveSystem", "CreatureSystem", "PlantSystem"],
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
