// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

contract SpaceSystem is System {
  function setSpace(
    bytes32 gameId,
    uint8 x
  ) public {
    address user = _msgSender();
  }
}
