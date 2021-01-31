// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

contract Number {

    // mapping of address to number
    mapping(address => uint) public userNumberMapping;

    // function to save number
    function saveNumber(uint _number) public {
        userNumberMapping[msg.sender] = _number;
    }

    // function to get number
    function getNumber() public view returns (uint) {
        return userNumberMapping[msg.sender];
    }

}