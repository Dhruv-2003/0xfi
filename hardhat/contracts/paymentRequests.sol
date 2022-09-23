// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
/// creator can create requests of the amount of money , with name , description for the payment requests
/// show all the payment options for the payee
/// send money to the funds contract directly on transfer , with no hold
/// can even create pay links for some other person , to recieve the money was an when they want to claim
/// can pay in eth
/// choose other currency options to be able to pay with them , support to be added

import "@openzeppelin/contracts/access/Ownable.sol";

interface fundsReciever {
    function addBalance(address user, uint256 amount) external;
}

contract paymentRequests is Ownable {
    fundsReciever _reciever;

    struct PaymentRequest {
        uint256 amount;
        uint256 deadline; /// time period after which links expires
        string detailsURI;
        bool paid;
    }

    /// mapping from creator Address =>  requestID => PaymentRequest Details
    mapping(address => mapping(uint256 => PaymentRequest)) private requests;

    /// just to find the max for request for each address
    mapping(address => uint256) public totalRequests;

    address private _fundsReciever;

    /// events for request creation to index with graph
    event RequestsCreated(
        address creator,
        uint256 id,
        uint256 amount,
        uint256 deadline,
        string detailsURI
    );

    event userPaid(address user, address payee, uint256 amount);

    // events for request paid to index with graph
    event RequestPaidFull(
        address payee,
        address payer,
        uint256 id,
        uint256 amount
    );

    constructor(address _recieverAddress) {
        require(_reciever != address(0), "Not a valid address");
        _fundsReciever = _recieverAddress;
        _reciever = fundsReciever(_recieverAddress);
    }

    ///@dev - create a payment request
    ///@param _amount -  Amount to be requested in ETH
    ///@param _deadline - time till when the link is active , according to UNIX time
    ///@param _detailsURI - IPFS URI for the json that stores all the data of the payments , name , description , and other info
    ///@return id - id of the request created by the user
    function createRequest(
        uint256 _amount,
        uint256 _deadline,
        string memory _detailsURI
    ) public returns (uint256 id) {
        require(_amount > 0, "Amount should be greater than 0");
        require(
            _deadline > block.timestamp + 10 minutes,
            "deadline should be atleast 10 minutes"
        );

        totalRequests[msg.sender] = 0;
        uint256 _id = totalRequests[msg.sender];

        requests[msg.sender][_id] = PaymentRequest(
            _amount,
            _deadline,
            _detailsURI,
            false
        );
        totalRequests[msg.sender] += 1;

        emit RequestsCreated(msg.sender, _id, _amount, _deadline, _detailsURI);
        return _id;
    }

    ///@dev - pay in whole for the payment request
    ///@param _creator - address of the reciever
    ///@param _id - id of the payment requests
    function PayinFull(address _creator, uint256 _id) public payable {
        require(_creator != address(0), "Not a valid address");
        PaymentRequest memory _request = requests[_creator][_id];

        require(
            _request.deadline < block.timestamp,
            "Deadline Passed , link expired"
        );
        require(!_request.paid, "Already Paid");

        require(msg.value == _request.amount, "Incorrect amount");

        (bool success, ) = _fundsReciever.call{value: msg.value}("");
        require(success, "Payment not completed");
        _request.paid = sucess;
        _reciever.addBalance(_creator, msg.value);
        emit RequestPaidFull(_creator, msg.sender, _id, msg.value);
    }

    ///@dev - pay with streaming
    ///@param _creator - address of the reciever
    ///@param _id - id of the payment requests
    function PayinStream(
        address _creator,
        uint256 _id,
        bool flowStatus
    ) public payable {
        require(_creator != address(0), "Not a valid address");
        PaymentRequest memory _request = requests[_creator][_id];

        require(
            _request.deadline < block.timestamp,
            "Deadline Passed , link expired"
        );
        require(!_request.paid, "Already Paid");

        /// try to check if the total amount is paid , need to check the amount paid in the flow with a method
        /// Superfluid SDK is used for creating the flow
    }

    ///pay to the user with unique link send it directly to the funds contract
    /// never expired link to accept payment , donations
    function pay(address user) public payable {
        require(msg.value > 0, "Amount can not be 0");
        (bool success, ) = _fundsReciever.call{value: msg.value}("");
        require(success, "Payment not completed");
        _reciever.addBalance(user, msg.value);
        emit userPaid(user, msg.sender, msg.value);
    }
}
