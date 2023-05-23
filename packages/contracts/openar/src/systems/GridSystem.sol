// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { SizeEnum, StateEnum } from "../codegen/Types.sol";
import { Map, MapData, Identity, IdentityData, Size, State, Grid, GridData, Owner } from "../codegen/Tables.sol";

contract GridSystem is System {
  function claimGrid(
    bytes32 mapId
  ) public returns (bytes32) {
    address client = _msgSender();

    require(Map.get(mapId).id == mapId, "map not found");
    require(State.get(mapId) == StateEnum.Active, "map not active");
    
    SizeEnum size = Size.get(mapId);
    uint32 gridCount = Map.get(mapId).gridCount;
   
    if (size == SizeEnum.Mini) {
      require(gridCount <= 4, "mini map full");
    } else if (size == SizeEnum.Small) {
      require(gridCount <= 9, "sm map full");
    } else if (size == SizeEnum.Medium) {
      require(gridCount <= 81, "md map full");
    } else if (size == SizeEnum.Large) {
      require(gridCount <= 729, "lg map full");
    } else {
      revert("invalid grid size");
    }

    bytes32 gridId = getUniqueEntity();

    Grid.set(mapId, gridId, GridData({
      id: gridId,
      position: gridCount
    }));
    State.set(gridId, StateEnum.Active);
    Owner.set(gridId, client);
    Map.set(mapId, MapData({
      id: mapId,
      gridCount: gridCount + 1
    }));
 
    return gridId;
  }

  function transferGrid(
    bytes32 mapId,
    bytes32 gridId,
    address to
  ) public returns (bytes32) {
    address client = _msgSender();

    require(Map.get(mapId).id == mapId, "map not found");
    require(State.get(mapId) == StateEnum.Active, "map not active");
    require(Grid.get(mapId, gridId).id == gridId, "grid not found");
    require(Owner.get(gridId) == client, "not grid owner");
    require(State.get(gridId) == StateEnum.Active, "grid not active");

    Owner.set(gridId, to);
    
    return gridId;
  }

  function setGrid(
    bytes32 mapId,
    bytes32 gridId,
    StateEnum state,
    string memory name,
    string memory description,
    string memory image
  ) public returns (bytes32) {
    address client = _msgSender();

    require(Map.get(mapId).id == mapId, "map not found");
    require(State.get(mapId) == StateEnum.Active, "map not active");
    require(Grid.get(mapId, gridId).id == gridId, "grid not found");
    require(Owner.get(gridId) == client, "not grid owner");
    require(State.get(gridId) == StateEnum.Active, "grid not active");

    // GridData  memory grid = Grid.get(mapId, gridId);
    IdentityData memory identity = Identity.get(gridId);

    if (bytes(name).length > 0) {
      identity.name = name;
    }
    if (bytes(description).length > 0) {
      identity.description = description;
    }
    if (bytes(image).length > 0) {
      identity.image = image;
    }

    State.set(gridId, state);
    Identity.set(gridId, identity);

    return gridId;
  }
}
