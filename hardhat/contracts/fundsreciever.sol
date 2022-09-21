// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/// recieve the amount from the payee and basically the most safe contract , that doesnot allows other contract to call any other functions
/// just keeps check of the balance of the creators
/// creators can just withdraw for the balance they have , or other master contract can maybe control to the flow of the money
/// the master contract can manage the money into the system
/// pause the withdrawls , only called by the owner
