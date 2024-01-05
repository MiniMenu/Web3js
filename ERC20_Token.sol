// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title ERC20_token simple implementation
 * @author Minal Abayaskera
 */

contract ERCToken20Impl is ERC20 {
    constructor(uint256 initialSupply) ERC20("MiniMenu", "MM") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}
