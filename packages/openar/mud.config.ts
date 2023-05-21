import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "openar",
  enums: {
    StateEnum: ["Active", "Frozen"],
    GridSizeEnum: ["Three", "Nine"],
  },
  tables: {
    State: {
      keySchema: { id: "bytes32" },
      schema: "StateEnum",
    },
    GridSize: {
      keySchema: { id: "bytes32" },
      schema: "GridSizeEnum",
    },
    Identity: {
      keySchema: { id: "bytes32" },
      schema: {
        name: "string",
        description: "string",
        image: "string",
      },
    },
    Cell: {
      keySchema: { owner: "address", token: "uint32", gridId: "bytes32" },
      schema: "bytes32[]",
    },
    Grid: {
      // Introduce higher level primitive to enable custom mapss
      keySchema: { owner: "address", mapID: "bytes32" },
      schema: "uint8[]",
    },
    Map: {
      keySchema: { owner: "address", mapID: "bytes32" },
      schema: "bytes32",
    },
    GridCount: {
      keySchema: {},
      schema: "uint32",
    },
  },
  systems: {
    CellSystem: {
      // Set space owner using address
      name: "CellSystem",
      openAccess: true,
    },
    GridSystem: {
      // Claim or Transfer to another user or game namespace
      name: "GridSystem",
      openAccess: true,
    },
    MapSystem: {
      name: "MapSystem",
      openAccess: true,
    },
    IncrementSystem: {
      name: "Increment",
      openAccess: false,
      accessList: ["GridSystem"],
    },
  },
});
