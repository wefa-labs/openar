// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import { MudV2Test } from "@latticexyz/std-contracts/src/test/MudV2Test.t.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { SizeEnum, StateEnum } from "../src/codegen/Types.sol";
import { Counter, CounterTableId } from "../src/codegen/Tables.sol";

contract CounterTest is MudV2Test {
  IWorld public world;

  function setUp() public override {
    super.setUp();
    world = IWorld(worldAddress);
  }

  function testWorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  function testCounter() public {
    uint32 counter = Counter.get(world);
    assertEq(counter, 0);

    // Expect the counter to be 2 after calling increment.
    world.openar_Increment_increment();
    counter = Counter.get(world);
    assertEq(counter, 1);
  }

  function testCreateMap() public {
    bytes32 mapId = world.openar_MapSystem_createMap("Test", "mapId should be Test", "Image", SizeEnum.Mini);
  }

  // function testClaimGrid() public {
  //   bytes32 mapId = world.openar_MapSystem_createMap(mapId, "Test", "mapId should be Test", "", SizeEnum.Mini);
  //   bytes32 gridId = world.openar_GridSystem_claimGrid(mapId);
  // }

  // function testTransferGrid() public {
  //   bytes32 mapId = world.openar_MapSystem_createMap(mapId, "Test", "mapId should be Test", "", SizeEnum.Mini);
  //   bytes32 gridId = world.openar_GridSystem_claimGrid(mapId);
  //   world.openar_GridSystem_transferGrid(gridId, address(this));
  // }

  // function testSetGrid() public {
  //   bytes32 mapId = world.openar_MapSystem_createMap(mapId, "Test", "mapId should be Test", "", SizeEnum.Mini);
  //   bytes32 gridId = world.openar_GridSystem_claimGrid(mapId);
  //   world.openar_SpaceSystem_setSpace(mapId, gridId, State.Active, "Test","Test Description", "Image");
  // }

  // function testSetSpace() public {
  //   bytes32 mapId = world.openar_MapSystem_createMap(mapId, "Test", "mapId should be Test", "", SizeEnum.Mini);
  //   bytes32 gridId = world.openar_GridSystem_claimGrid(mapId);
  //   world.openar_SpaceSystem_setSpace(mapId, gridId, State.Active, "Test","Test Description", "Image");
  // }
}
