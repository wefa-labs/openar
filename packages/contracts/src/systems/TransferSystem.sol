// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {System} from "@latticexyz/world/src/System.sol";

import {Balance} from "../codegen/tables/Balance.sol";
import {Owner} from "../codegen/tables/Owner.sol";

contract TransferSystem is System {
    event Transfer(address from, address to, uint256 token);

    function transfer(uint256 token, address to) public {
        address from = Owner.get(token);
        Owner.set(token, to);
        Balance.set(from, Balance.get(from) - 1);
        Balance.set(to, Balance.get(to) + 1);

        emit Transfer(from, to, token);
    }
}
