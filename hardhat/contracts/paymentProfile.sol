// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

////creator can set the payment profile
/// issue profile specific payment links - to send somebody to recieve payment
/// set the reciever address
/// might be verify their reciever address with help of a small money transfer and getting a transfer badge
/// wihtdraw all the money they have got into the system

import "@openzeppelin/contracts/access/Ownable.sol";

interface fundsReciever {}

contract paymentProfile {
    struct User {
        address reciever;
        string name;
        bool verified;
        uint256 requested;
        bool user;
    }

    /// might be add the record of the payment recieved for the user

    mapping(address => User) public users;

    event userCreated(address user, string name);

    // address public RecieverContract;

    constructor() payable {}

    modifier onlyUser() {
        require(users[msg.sender].user, "Not a user");
        _;
    }

    /// register as a user on the portal
    function register(address reciever, string name) public {
        require(reciever != address(0), "not a valid address");
        users[msg.sender] == User(reciever, name, false, 0, true);
    }

    ///to set the reciever address
    function setReciever(address newReciever) public onlyUser {
        require(newReciever != address(0), "not a valid address");
        users[msg.sender].reciever = newReciever;
    }

    // function setFundsReciever(address contractReceiver) public onlyOwner {
    //     require(contractReciever != address(0), "Not a valid address");
    //     RecieverContract = contractReceiver;
    // }

    /// verify receiver address
    /// Funds will be sent to the address of the user to check if the wallet receives the funds
    /// If not then the address will be marked as suspicious with help of SBT
    function verify(address user) public onlyUser {
        require(users[msg.sender].verified, "You are already verified");
        require(
            users[msg.sender].requested <= 2,
            "You can just try to verify only twice"
        );
        users[msg.sender].receiever = user;
        uint256 amount = 0.005 ether;
        (bool success, ) = user.call{value: amount}("");
        require(success, "Payment not completed");
        users[msg.sender].requested += 1;
    }

    ///will be called when the amount is recieved by the user and to complete the verification status
    function confirm(address user, bool _verified) public onlyUser {
        require(users[msg.sender].verified, "You are already verified");
        users[msg.sender].verified = _verified;
        users[msg.sender].receiever = user;
    }

    ///get the details of user
    function getUser(address _user) public view returns (User memory) {
        return users[_user];
    }

    function getReciever(address _user) public view returns (address) {
        return users[_user].reciever;
    }

    function checkUser(addrss _user) public view returns (bool) {
        return users[_user].user;
    }

    /// In case a user is supected, Owner could stop the withdrawl
    function suspectUser(address _user) public onlyOwner {
        users[msg.sender].verified = false;
    }
}
