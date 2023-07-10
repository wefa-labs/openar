// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import "forge-std/Test.sol";
import { MudV2Test } from "@latticexyz/std-contracts/src/test/MudV2Test.t.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { SizeEnum, StateEnum, RoleEnum } from "../src/codegen/Types.sol";
import { Identity, IdentityData, ARWorld, ARWorldData, Game, GameData, Match, MatchData, Role } from "../src/codegen/Tables.sol";

contract SystemTest is MudV2Test {
  IWorld public world;
  bytes32 worldID; 

  function setUp() public override {
    super.setUp();
    world = IWorld(worldAddress);
    worldID =  world.createWorld("Test", "worldId should be Test", "Image");
  }

  function testCreateGame() public {
    bytes32 spaceId = world.claimSpace(worldID);
    bytes32 gameId = world.createGame(RoleEnum.X, "Test", worldID, spaceId);
    // GameData memory gameData = Game.get(gameId);
    // IdentityData memory identityData = Identity.get(gameId);
    // MatchData memory matchData = Match.get(gameId, 0);
    // RoleEnum role = Role.get(address(this), gameId);

    // assertEq(gameData.matchesPlayed, 0, "matchesPlayed should be 0");
    // assertEq(gameData.worldId, worldID, "worldId wrong");
    // assertEq(gameData.spaceId, spaceId, "spaceId should be spaceId");
    // assertEq(gameData.winner, address(0), "winner should be address(0)");
    // assertEq(identityData.name, "Test", "name should be Test");
    // assertEq(identityData.description, "", "description should be empty");
    // assertEq(identityData.image, "", "image should be empty");
    // assertEq(matchData.turnCount, 0, "turnCount should be 0");
    // assertEq(matchData.currentPlayer, address(0), "currentPlayer should be address(0)");
    // assertEq(matchData.winner, address(0), "winner should be address(0)");
    // // assertEq(matchData.players[0], _msgSender(), "players[0] should be _msgSender()");
    // assertEq(matchData.players[1], address(0), "players[1] should be address(0)");
    // assertEq(matchData.board[0], 7, "board[0] should be 7");
    // assertEq(matchData.board[1], 7, "board[1] should be 7");
    // assertEq(matchData.board[2], 7, "board[2] should be 7");
    // assertEq(matchData.board[3], 7, "board[3] should be 7");
    // assertEq(matchData.board[4], 7, "board[4] should be 7");
    // assertEq(matchData.board[5], 7, "board[5] should be 7");
    // assertEq(matchData.board[6], 7, "board[6] should be 7");
    // assertEq(matchData.board[7], 7, "board[7] should be 7");
    // assertEq(matchData.board[8], 7, "board[8] should be 7");
  }

  function testJoinGame() public {
    bytes32 spaceId = world.claimSpace(worldID);
    bytes32 gameId = world.createGame(RoleEnum.X, "Test", worldID, spaceId);

    // vm.startPrank(alice);
    
    // RoleEnum role = world.joinGame(gameId);

    // vm.stopPrank(alice);
    // assertEq(role, RoleEnum.O);
  }

  function testClaimPosition() public {
  }

  function testGameWin() public {
  }

  function testGameDraw() public {
  }
}
