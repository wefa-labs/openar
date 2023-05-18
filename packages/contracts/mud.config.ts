import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    RoleEnum: ["X", "O"],
  },
  tables: {
    TokenID: {
      schema: "uint256",
    },
    Balance: {
      keySchema: { owner: "address" },
      schema: { amount: "uint256" },
    },
    Owner: {
      keySchema: { token: "uint256" },
      schema: { owner: "address" },
    },
    Role: {
      schema: "RoleEnum",
    },
    Match: {
      schema: {
        board: "int32[]",
        winner: "address",
      },
    },
    Identity: {
      schema: {
        name: "string",
        createdAt: "uint256",
      },
    },
    OwnedBy: {
      schema: "uint256",
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
    CollectibleSystem: {
      name: "Collectible",
      openAccess: true,
    },
    MintSystem: {
      name: "Mint",
      openAccess: false,
      accessList: ["Collectible"],
    },
    TransferSystem: {
      name: "Transfer",
      openAccess: false,
      accessList: ["Collectible"],
    },
  },
  // modules: [],
});
