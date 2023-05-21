import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "openar",
  enums: {
    GridSizeEnum: ["Three", "Nine"],
  },
  tables: {
    Grid: {
      keySchema: { owner: "address", id: "bytes32" },
      schema: {
        size: "GridSizeEnum",
        spaces: "uint8[]",
      },
    },
    Space: {
      keySchema: { owner: "address", token: "uint32" },
      schema: "uint8",
    },
    GridCount: {
      keySchema: {},
      schema: "uint32",
    },
    SpaceCount: {
      keySchema: {},
      schema: "uint32",
    },
  },
  systems: {
    GridSystem: {
      // Claim or Transfer to another user or game namespace
      name: "GridSystem",
      openAccess: true,
    },
    SpaceSystem: {
      // Set space owner using address
      name: "SpaceSystem",
      openAccess: true,
    },
    IncrementSystem: {
      name: "Increment",
      openAccess: false,
      accessList: ["GridSystem", "SpaceSystem"],
    },
  },
});
