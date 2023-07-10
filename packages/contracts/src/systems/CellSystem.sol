// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import { System } from "@latticexyz/world/src/System.sol";

import { StateEnum, ActivityEnum } from "../codegen/Types.sol";
import { ARWorld, Space, SpaceData, Cell, State, Size, Owner } from "../codegen/Tables.sol";

contract CellSystem is System {
  function setCell(
    bytes32 worldId,
    bytes32 spaceId,
    // uint32 x,
    // uint32 y,
    uint8 position,
    bytes32 value
  ) public {
    // require(x < 81, "x out of range");
    // require(y < 81, "y out of range");
    require(position < 81, "position out of range");
    require(ARWorld.get(worldId).id == worldId, "world not found");
    require(State.get(worldId) == StateEnum.Active, "world not active");
    require(Space.get(worldId, spaceId).id == spaceId, "space not found");
    require(Space.get(worldId, spaceId).activity != ActivityEnum.NONE, "activity not set");
    require(State.get(spaceId) == StateEnum.Active, "space not active");
    
    Cell.set(worldId, spaceId, position, value);    
  }
}
