import { useState } from "react";
import ABI from "./ABI.json";
import Web3 from "web3";
import './Wallet.css';

const Wallet = ({ saveState }) => {
  const [connected, setConnected] = useState(true);
  const [contractAddress, setContractAddress] = useState(""); // Store contract address from user input
  const isAndroid = /android/i.test(navigator.userAgent);

  const init = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Check if the contract address is valid before proceeding
      if (web3.utils.isAddress(contractAddress)) {
        const contract = new web3.eth.Contract(ABI, contractAddress);
        console.log(contract);
        setConnected(false);
        saveState({ web3: web3, contract: contract });
      } else {
        alert("Invalid contract address. Please enter a valid address.");
      }
    } catch (error) {
      alert("Please Install Metamask");
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="header">
        {isAndroid && (
          <button className="connectBTN">
            <a href="https://metamask.app.link/dapp/sriche.netlify.app/">Click For Mobile</a>
          </button>
        )}
      </div>

      {/* Container Section */}
      <div className="container000">
        <h1>Enter the Contract Address to Find the Person</h1>
        <div className="container01">
          <input
            type="text"
            className="addressInput"
            placeholder="Enter Contract Address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            disabled={!connected} // Disable input if already connected
          />
          <button className="connectBTN" onClick={init} disabled={!connected}>
            {connected ? "Connect Metamask" : "Connected Metamask"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Wallet;
