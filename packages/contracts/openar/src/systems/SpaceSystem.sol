// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { StateEnum } from "../codegen/Types.sol";
import { Map, Grid, GridData, Space, State, Size, Owner } from "../codegen/Tables.sol";

contract SpaceSystem is System {
  function setSpace(
    bytes32 mapId,
    bytes32 gridId,
    uint8 x,
    uint8 y,
    bytes32[] calldata value
  ) public {
    address client = _msgSender();

    require(x < 9, "x out of range");
    require(y < 9, "y out of range");
    require(Map.get(mapId).id == mapId, "map not found");
    require(State.get(mapId) == StateEnum.Active, "map not active");
    require(Grid.get(mapId, gridId).id == gridId, "grid not found");
    require(Owner.get(gridId) == client, "not grid owner");
    require(State.get(gridId) == StateEnum.Active, "grid not active");
    
    Space.set(mapId, gridId, x, y, value);    
  }
}
