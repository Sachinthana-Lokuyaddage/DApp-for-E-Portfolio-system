import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./ContractAdresses.css";

function ContractAdresses() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [emailFilter, setEmailFilter] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const web3 = new Web3(window.ethereum);

  const contractABI = [
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_email", type: "string" },
        { internalType: "address", name: "_contractAddress", type: "address" },
      ],
      name: "storeUserInfo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "uint256", name: "userId", type: "uint256" },
        { indexed: false, internalType: "address", name: "user", type: "address" },
        { indexed: false, internalType: "string", name: "name", type: "string" },
        { indexed: false, internalType: "string", name: "email", type: "string" },
        { indexed: false, internalType: "address", name: "contractAddress", type: "address" },
      ],
      name: "UserInfoStored",
      type: "event",
    },
    {
      inputs: [],
      name: "getAllUsers",
      outputs: [
        {
          components: [
            { internalType: "string", name: "name", type: "string" },
            { internalType: "string", name: "email", type: "string" },
            { internalType: "address", name: "contractAddress", type: "address" },
          ],
          internalType: "struct UserInfoStorage.UserInfo[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const contractAddress = "0x4c0bf2E81A9850222fd7d49b78D1C3E9c0DE8B66";
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const usersData = await contract.methods.getAllUsers().call();
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error("Error retrieving users:", error);
    }
  };

  const handleFilterChange = (e) => {
    const email = e.target.value;
    setEmailFilter(email);
    if (email.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopyMessage(`Copied: ${address}`);
      setTimeout(() => setCopyMessage(""), 2000); // Clear message after 2 seconds bjhv b
    });
  };

  return (
    <div className="contract-addresses-container">
      <h1>Contract Addresses</h1>

    {/* Email filter input */}
<div className="filter-container">
  <label htmlFor="email-filter">Filter by Email:</label>
  <input
    id="email-filter"
    type="text"
    placeholder="Enter email to filter"
    value={emailFilter}
    onChange={handleFilterChange}
  />
</div>


      {/* Feedback message */}
      {copyMessage && <div className="copy-message">{copyMessage}</div>}

      {/* Table of filtered results */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contract Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contractAddress}</td>
              <td>
                <button onClick={() => handleCopy(user.contractAddress)}>Copy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContractAdresses;
