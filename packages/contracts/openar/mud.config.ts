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
    Cell: {
      keySchema: { worldId: "bytes32", spaceId: "bytes32", position: "uint32" },
      schema: {
        x: "uint32",
        y: "uint32",
        values: "bytes32[]",
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
    CellSystem: {
      name: "CellSystem",
      openAccess: true, // TODO: Bring back access control when grant acess is functioning
    },
    SpaceSystem: {
      name: "SpaceSystem",
      openAccess: true,
    },
    WorldSystem: {
      name: "WorldSystem",
      openAccess: true,
    },
    // SANITY CHECK
    IncrementSystem: {
      name: "Increment",
      openAccess: true,
    },
  },
});
