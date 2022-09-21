// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/// recieve the amount from the payee and basically the most safe contract , that doesnot allows other contract to call any other functions
/// just keeps check of the balance of the creators
/// creators can just withdraw for the balance they have , or other master contract can maybe control to the flow of the money
/// the master contract can manage the money into the system
/// pause the withdrawls , only called by the owner

import "@openzeppelin/contracts/access/Ownable.sol";

contract fundsReciever is Ownable {
    event recieved(address indexed sender, uint256 amount);

    /// @dev Function to receive Ether. msg.data must be empty
    receive() external payable {
        contributors[msg.sender] = true;
        emit received(msg.sender, msg.value);
    }

    /// @dev Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
