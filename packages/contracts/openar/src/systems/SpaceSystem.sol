// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { StateEnum } from "../codegen/Types.sol";
import { Map, Grid, Space, State } from "../codegen/Tables.sol";

contract SpaceSystem is System {
  function setSpace(
    bytes32 mapId,
    bytes32 gridId,
    uint8 x,
    uint8 y,
    bytes32[] calldata value
  ) public {
    address client = _msgSender();

    // Check Grid ownership
    require(State.get(mapId) == StateEnum.Active, "map not active");
    require(Grid.get(client, mapId) != bytes32(0), "not grid owner");

    // Set Space
    Space.set(client, gridId, x, y, value);    
  }
}
