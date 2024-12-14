// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserInfoStorage {

    // Structure to store user information
    struct UserInfo {
        string name;
        string email;
        address contractAddress;
    }

    // Mapping to store user info by ID (increasing number)
    mapping(uint256 => UserInfo) private userInfos;

    // Mapping to store the address of each user to their respective ID
    mapping(address => uint256) private userIds;

    // Array to keep track of user IDs for iteration
    uint256[] private userIdList;

    // Counter to keep track of user IDs
    uint256 private userCount;

    // Event to log user info storage
    event UserInfoStored(uint256 userId, address user, string name, string email, address contractAddress);

    // Constructor to initialize the user count
    constructor() {
        userCount = 0; // Start counting from 1
    }

    // Function to store user info with incrementing ID
    function storeUserInfo(string memory _name, string memory _email, address _contractAddress) public {
        userCount++; // Increment the user count
        uint256 userId = userCount; // Assign the new ID to the user

        userInfos[userId] = UserInfo(_name, _email, _contractAddress);
        userIds[msg.sender] = userId; // Store the ID for the user's address

        userIdList.push(userId); // Add the userId to the list

        emit UserInfoStored(userId, msg.sender, _name, _email, _contractAddress);
    }

    // Function to retrieve user info by ID
    function getUserInfoById(uint256 _userId) public view returns (string memory name, string memory email, address contractAddress) {
        UserInfo memory user = userInfos[_userId];
        return (user.name, user.email, user.contractAddress);
    }

  
    // Function to get the current user count (to know the next ID)
    function getCurrentUserCount() public view returns (uint256) {
        return userCount;
    }

    // Function to get all stored users
    function getAllUsers() public view returns (UserInfo[] memory) {
        UserInfo[] memory allUsers = new UserInfo[](userCount);
        for (uint256 i = 0; i < userIdList.length; i++) {
            uint256 userId = userIdList[i];
            allUsers[i] = userInfos[userId];
        }
        return allUsers;
    }
}
