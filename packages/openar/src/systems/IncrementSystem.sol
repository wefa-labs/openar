// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { GridCount } from "../codegen/Tables.sol";

contract IncrementSystem is System {
  function increment() public returns (uint32) {
    uint32 counter = GridCount.get();
    uint32 newValue = counter + 1;
    GridCount.set(newValue);
    return newValue;
  }
}
