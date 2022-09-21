// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

////creator can set the payment profile
/// issue profile specific payment links - to send somebody to recieve payment
/// set the receiever address
/// might be verify their reciever address with help of a small money transfer and getting a transfer badge
/// wihtdraw all the money they have got into the system

import "@openzeppelin/contracts/access/Ownable.sol";

interface fundsReciever {}

contract paymentProfile {
    struct User {
        address reciever;
        string name;
        bool verified;
        bool user;
    }

    /// might be add the record of the payment recieved for the user

    mapping(address => User) public users;

    event userCreated(address user, string name);
    event userPaid(address user, address payee, uint256 amount);

    address public RecieverContract;

    constructor() {}

    modifier onlyUser() {
        require(users[msg.sender].user, "Not a user");
        _;
    }

    /// register as a user on the portal
    function register(address reciever, string name) public {
        require(reciever != address(0), "not a valid address");
        users[msg.sender] == User(reciever, name, false, true);
    }

    ///to set the reciever address
    function setReciever(address newReciever) public onlyUser {
        require(newReciever != address(0), "not a valid address");
        users[msg.sender].reciever = newReciever;
    }

    function setFundsReciever(address contractReceiver) public onlyOwner {
        require(contractReciever != address(0), "Not a valid address");
        RecieverContract = contractReceiver;
    }

    ///pay to the user with unique link send it directly to the funds contract
    function pay(address user) public payable {
        require(msg.value > 0, "Amount can not be 0");
        (bool success, ) = RecieverContract.call{value: msg.value}("");
        require(success, "Payment not completed");
        emit userPaid(user, msg.sender, msg.value);
    }

    ///verify receiver address

    ///get the details of user
}
