// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ComplaintManagement {
    address public owner;
    mapping(string => Complaint) public complaints;
    string[] public unresolvedComplaints;
    string[] public resolvedComplaints;

    struct Complaint {
        address user;
        bool resolved;
    }

    event ComplaintRegistered(
        string indexed complaintId,
        address indexed user
    );
    event ComplaintResolved(string indexed complaintId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function registerComplaint(string memory complaintId) external {
        complaints[complaintId] = Complaint(msg.sender, false);
        unresolvedComplaints.push(complaintId);
        emit ComplaintRegistered(complaintId, msg.sender);
    }

    function getAllComplaints() external view returns (string[] memory) {
        string[] memory allComplaints = new string[](unresolvedComplaints.length + resolvedComplaints.length);
    
        for (uint256 i = 0; i < unresolvedComplaints.length; i++) {
            allComplaints[i] = unresolvedComplaints[i];
        }

        for (uint256 i = 0; i < resolvedComplaints.length; i++) {
            allComplaints[unresolvedComplaints.length + i] = resolvedComplaints[i];
        }

        return allComplaints;
    }

    function resolveComplaint(string memory complaintId) external payable {
        address user = complaints[complaintId].user;

        require(msg.sender == user, "You are not authorized to resolve this complaint");
        require(user != address(0), "Complaint does not exist");
        require(!complaints[complaintId].resolved, "Complaint is already resolved");

        complaints[complaintId].resolved = true;

        for (uint256 i = 0; i < unresolvedComplaints.length; i++) {
            if (keccak256(abi.encodePacked(unresolvedComplaints[i])) == keccak256(abi.encodePacked(complaintId))) {
                unresolvedComplaints[i] = unresolvedComplaints[unresolvedComplaints.length - 1];
                unresolvedComplaints.pop();
                break;
            }
        }
        resolvedComplaints.push(complaintId);
        emit ComplaintResolved(complaintId);
    }

    function getUnresolvedComplaints() external view returns (string[] memory) {
        return unresolvedComplaints;
    }

    function getResolvedComplaints() external view returns (string[] memory) {
        return resolvedComplaints;
    }
}
