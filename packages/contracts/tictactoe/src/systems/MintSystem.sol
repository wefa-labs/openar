// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { Balance, Owner } from "../codegen/Tables.sol";

contract MintSystem is System {
    event Transfer(address to, uint256 token);

    function mint( address to, uint256 token) public returns (uint256) {
        require(to != address(0), "address invalid");
        require(Owner.get(token) == address(0), "token already minted");

        Owner.set(token, to);
        Balance.set(to, Balance.get(to) + 1);

        emit Transfer(to, token);

        return token;
    }
}
