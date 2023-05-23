// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";

contract PostDeploy is Script {
  function run(address worldAddress) external {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    vm.startBroadcast(deployerPrivateKey);

    // Give write acess to game namespaces
    // IWorld(worldAddress).grantAccess("tictactoe", "SpaceSystem", address(this));
    // IWorld(worldAddress).grantAccess("checkers", "SpaceSystem", address(this));

    // TODO: Add NFT deployment of creature contracts

    console.log("PostDeploy: granted access to SpaceSystem");

    vm.stopBroadcast();
  }
}
