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
    Element: "ElementEnum",
    Owner: "address",
    Role: {
      keySchema: { user: "address", matchId: "bytes32" },
      schema: "RoleEnum",
    },
    Asset: {
      keySchema: { id: "bytes32" },
      schema: {
        image: "string",
        model: "string",
      },
    },
    Care: {
      keySchema: { id: "bytes32" },
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
      keySchema: { gameId: "bytes32", matchNumber: "uint8" },
      schema: {
        turnCount: "uint8",
        currentPlayer: "address",
        winner: "address",
        players: "address[]",
        board: "uint8[]",
      },
    },
    Game: {
      keySchema: { gameId: "bytes32" },
      schema: {
        matchesPlayed: "uint8",
        worldId: "bytes32",
        spaceId: "bytes32",
        winner: "address",
        players: "address[]",
      },
    },
    Cell: {
      keySchema: { worldId: "bytes32", spaceId: "bytes32", position: "uint8" },
      schema: {
        // x: "uint32",
        // y: "uint32",
        value: "bytes32",
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
      name: "Creature",
      openAccess: true,
    },
    PlantSystem: {
      name: "Plant",
      openAccess: true,
    },
    SpaceSystem: {
      openAccess: true,
      accessList: ["GameStartSystem", "GameMoveSystem"],
    },
    CellSystem: {
      openAccess: true,
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
