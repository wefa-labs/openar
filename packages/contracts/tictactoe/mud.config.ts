import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  // worldContractName: "tictactoe",
  // namespace: "tictactoe",
  enums: {
    RoleEnum: ["X", "O"],
  },
  tables: {
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
        board: "uint8[9]",
        players: "bytes32[2]",
        winner: "address",
        trophyClaimed: "bool",
        currentPlayer: "bytes32",
        turnCount: "uint8",
      },
    },
    Identity: {
      schema: {
        name: "string",
        createdAt: "uint256",
      },
    },
    PlayerID: {
      keySchema: { user: "address", gameId: "bytes32" },
      schema: "bytes32",
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
      accessList: ["CollectibleSystem"],
    },
    TransferSystem: {
      name: "Transfer",
      openAccess: false,
      accessList: ["CollectibleSystem"],
    },
    IncrementSystem: {
      name: "Increment",
      openAccess: true,
    },
  },
  // modules: [],
});
