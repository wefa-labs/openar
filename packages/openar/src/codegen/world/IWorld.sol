// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { IBaseWorld } from "@latticexyz/world/src/interfaces/IBaseWorld.sol";

import { IGridSystem } from "./IGridSystem.sol";
import { IIncrementSystem } from "./IIncrementSystem.sol";
import { ISpaceSystem } from "./ISpaceSystem.sol";

/**
 * The IWorld interface includes all systems dynamically added to the World
 * during the deploy process.
 */
interface IWorld is IBaseWorld, IGridSystem, IIncrementSystem, ISpaceSystem {

}
