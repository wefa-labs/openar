import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "openar",
  enums: {
    StateEnum: ["Active", "Frozen"],
    SizeEnum: ["Small", "Medium", "Large"],
  },
  tables: {
    // Testing Purposes
    Counter: {
      keySchema: {},
      schema: "uint32",
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
    Space: {
      keySchema: { owner: "address", gridId: "bytes32" },
      schema: {
        x: "uint8",
        y: "uint8",
        value: "bytes32[]",
      },
    },
    Range: {
      keySchema: { id: "bytes32" },
      schema: {
        xRange: "uint8[2]",
        yRange: "uint8[2]",
      },
    },
    GridCount: {
      keySchema: { mapId: "bytes32" },
      schema: "uint32",
    },
    Grid: {
      keySchema: { owner: "address", mapID: "bytes32" },
      schema: "bytes32",
    },
    Map: {
      keySchema: { owner: "address" },
      schema: "bytes32",
    },
  },
  systems: {
    // Testing Purposes
    IncrementSystem: {
      name: "Increment",
      openAccess: true,
    },
    SpaceSystem: {
      name: "SpaceSystem",
      openAccess: false,
      accessList: ["GridSystem"],
    },
    GridSystem: {
      name: "GridSystem",
      openAccess: true,
    },
    MapSystem: {
      name: "MapSystem",
      openAccess: true,
    },
  },
});
