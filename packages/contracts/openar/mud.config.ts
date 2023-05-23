import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "openar",
  enums: {
    StateEnum: ["Active", "Frozen"],
    SizeEnum: ["Mini", "Small", "Medium", "Large"],
  },
  tables: {
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
      keySchema: { mapId: "bytes32", gridId: "bytes32", x: "uint32", y: "uint32" },
      schema: "bytes32[]",
    },
    Grid: {
      keySchema: { mapID: "bytes32", gridId: "bytes32" },
      schema: {
        id: "bytes32",
        position: "uint32",
      },
    },
    Map: {
      keySchema: { mapId: "bytes32" },
      schema: {
        id: "bytes32",
        gridCount: "uint32",
      },
    },
    // Testing Purposes
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
  },
  systems: {
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
    // Testing Purposes
    IncrementSystem: {
      name: "Increment",
      openAccess: true,
    },
  },
});
