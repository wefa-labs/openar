// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

contract GridSystem is System {
  function claim(
    string memory name
  ) public returns (bytes32) {
    address user = _msgSender();

    bytes32 gameId = getUniqueEntity();
    bytes32 playerId = getUniqueEntity();

    return gameId;
  }

  function transfer(
    bytes32 gameId
  ) public returns (bytes32) {

    return gameId;
  }
}
