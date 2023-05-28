// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { StateEnum } from "../codegen/Types.sol";
import { ARWorld, Space, SpaceData, Cell, State, Size, Owner } from "../codegen/Tables.sol";

contract CellSystem is System {
  function setCell(
    bytes32 worldId,
    bytes32 spaceId,
    uint32 x,
    uint32 y,
    uint32 z,
    bytes32 value
  ) public {
    address client = _msgSender();

    require(x < 81, "x out of range");
    require(y < 81, "y out of range");
    require(z < 81, "z out of range");
    require(ARWorld.get(worldId).id == worldId, "world not found");
    require(State.get(worldId) == StateEnum.Active, "world not active");
    require(Space.get(worldId, spaceId).id == spaceId, "space not found");
    require(Owner.get(spaceId) == client, "not space owner");
    require(State.get(spaceId) == StateEnum.Active, "space not active");
    
    Cell.set(worldId, spaceId, x, y, z, value);    
  }
}
