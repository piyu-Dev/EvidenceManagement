// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ComplaintManagement {
    address public owner;
    mapping(uint256 => Complaint) public complaints;
    uint256[] public unresolvedComplaints;
    uint256[] public resolvedComplaints;

    struct Complaint {
        address user;
        bool resolved;
    }

    event ComplaintRegistered(
        uint256 indexed complaintId,
        address indexed user
    );
    event ComplaintResolved(uint256 indexed complaintId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function registerComplaint(uint256 complaintId) external {
        complaints[complaintId] = Complaint(msg.sender, false);
        unresolvedComplaints.push(complaintId);
        emit ComplaintRegistered(complaintId, msg.sender);
    }


    function getAllComplaints() external view returns (uint256[] memory) {
    uint256[] memory allComplaints = new uint256[](unresolvedComplaints.length + resolvedComplaints.length);
    
    for (uint256 i = 0; i < unresolvedComplaints.length; i++) {
        allComplaints[i] = unresolvedComplaints[i];
    }

    for (uint256 i = 0; i < resolvedComplaints.length; i++) {
        allComplaints[unresolvedComplaints.length + i] = resolvedComplaints[i];
    }

    return allComplaints;
}



   function resolveComplaint(uint256 complaintId) external payable{
    address user = complaints[complaintId].user;

    require(msg.sender == user, "You are not authorized to resolve this complaint");
    require(user != address(0), "Complaint does not exist");
    require(!complaints[complaintId].resolved, "Complaint is already resolved");

    complaints[complaintId].resolved = true;

    for (uint256 i = 0; i < unresolvedComplaints.length; i++) {
        if (unresolvedComplaints[i] == complaintId) {
            unresolvedComplaints[i] = unresolvedComplaints[unresolvedComplaints.length - 1];
            unresolvedComplaints.pop();
            break;
        }
    }
    resolvedComplaints.push(complaintId);
    emit ComplaintResolved(complaintId);
}



    function getUnresolvedComplaints() external view returns (uint256[] memory) {
        return unresolvedComplaints;
    }

    function getResolvedComplaints() external view returns (uint256[] memory) {
        return resolvedComplaints;
    }
}
