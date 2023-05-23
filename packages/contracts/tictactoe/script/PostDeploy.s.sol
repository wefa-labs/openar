// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { RoleEnum } from "../src/codegen/Types.sol";


import { TicTacToeCollectible } from "../src/Collectible.sol";

contract PostDeploy is Script {
  function run(address worldAddress) external {
    // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    // Start broadcasting transactions from the deployer account
    vm.startBroadcast(deployerPrivateKey);

    // ------------------ EXAMPLES ------------------

    // Deploy a new collectible contract
    new TicTacToeCollectible();
    console.log("Deployed TicTacToeCollectible");

    // Call create on the world via the registered function selector
    bytes32 newValue = IWorld(worldAddress).tictactoe_GameStart_create(RoleEnum.X, "TicTacToe", bytes32(0));
    console.log("Increment via IWorld:", uint256(newValue));

    vm.stopBroadcast();
  }
}
