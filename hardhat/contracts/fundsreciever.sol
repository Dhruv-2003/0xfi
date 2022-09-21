// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/// recieve the amount from the payee and basically the most safe contract , that doesnot allows other contract to call any other functions
/// just keeps check of the balance of the creators
/// creators can just withdraw for the balance they have , or other master contract can maybe control to the flow of the money
/// the master contract can manage the money into the system
/// pause the withdrawls , only called by the owner

import "@openzeppelin/contracts/access/Ownable.sol";

contract fundsReciever is Ownable {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public investedBalance;

    address controller;
    address investor;
    bool paused;

    event recieved(address indexed sender, uint256 amount);
    event withdrawl(address user, uint256 amount);
    event invested(address user, uint256 amount);

    constructor() {}

    modifier onlyWhenNotPaused() {
        require(!paused, "Contract is currently paused");
        _;
    }

    modifier onlyUser() {
        require(balances[msg.sender] > 0, "No Balance");
        _;
    }

    modifier onlyController() {
        require(msg.sender == controller, "Not the controller");
        _;
    }
    modifier onlyInvestor() {
        require(msg.sender == investor, "Not the investor");
        _;
    }

    ///@dev Function to add amount to balance
    function addBalance(address user, uint256 amount)
        public
        onlyController
        onlyWhenNotPaused
    {
        require(user != address(0), "Not a valid address");
        require(amount != 0, "Not a valid amount");

        balances[user] += amount;
    }

    /// to withdraw the amount they have kept in the contract ,withdraw in full
    function withdrawUser(uint256 amount)
        public
        onlyUser
        onlyWhenNotPaused
        returns (bool _success)
    {
        require(amount != 0, "Not a valid amount");
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Payment not completed");
        emit withdrawl(msg.sender, amount);
        return _success;
    }

    /// to withdraw the invested amount directly or other methods
    function withdrawInvested(uint256 amount)
        public
        onlyUser
        onlyWhenNotPaused
    {}

    /// to be able to invest this in staking , lending or other earning methods with the help of investor contract
    /// can only be called by the investor contract
    function invest(
        address user,
        uint256 _amount,
        address receiver
    ) public onlyInvestor onlyWhenNotPaused {
        require(amount != 0, "Not a valid amount");
        balances[msg.sender] -= _amount;
        investedBalance[msg.sender] += amount;
        (bool success, ) = receiver.call{value: _amount}("");
        require(success, "Payment not completed");
        emit invested(user, _amount);
        return _success;
    }

    /// set the controller of the some restricted functions
    function setController(address _controller) public onlyOwner {
        require(_controller != address(0), "not a valid contract address");
        controller = _controller;
    }

    /// set the investor who can withdraw some money as an when approved by the user
    function setInvestor(address _investor) public onlyOwner {
        require(_controller != address(0), "not a valid contract address");
        investor = _investor;
    }

    function pauseWithdrawls() public onlyOwner {
        paused = !paused;
    }

    /// show the current balance in the frontend
    function getBalance(address user) public view returns (uint256 _balance) {
        return balances[user];
    }

    /// @dev Function to receive Ether. msg.data must be empty
    receive() external payable {
        emit received(msg.sender, msg.value);
    }

    /// @dev Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
