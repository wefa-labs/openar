import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "openar",
  enums: {
    StateEnum: ["Active", "Frozen"],
  },
  tables: {
    State: {
      keySchema: { id: "bytes32" },
      schema: "StateEnum",
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
      keySchema: { owner: "address", token: "uint32", gridId: "bytes32" },
      schema: {
        position: "uint8",
        value: "bytes32[]",
      },
    },
    Grid: {
      keySchema: { owner: "address", mapID: "bytes32" },
      schema: "uint8[]",
    },
    Map: {
      keySchema: { owner: "address", mapID: "bytes32" },
      schema: "bytes32",
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
      openAccess: true,
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
