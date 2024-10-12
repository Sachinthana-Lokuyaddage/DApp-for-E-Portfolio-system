import {useState} from "react";
import ABI from "./ABI.json";
import Web3 from "web3";
import './Wallet.css';

const Wallet =({saveState})=>{
      const [connected,setConnected]=useState(true);
      const isAndroid = /android/i.test(navigator.userAgent);
      const init =async()=>{
      try{
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({method:'eth_requestAccounts'});
        const contract = new web3.eth.Contract(ABI,"0xD82282d1e03B01Ee2A73FaA060c355ae0eA0e3F5");
        console.log(contract)
         setConnected(false);
         saveState({web3:web3,contract:contract});
      }catch(error){
        alert("Please Install Metamask");
      }
        //0xD82282d1e03B01Ee2A73FaA060c355ae0eA0e3F5 , 0xdD2aEf83447bc2a0860727DCb0EFe61056a7a8aa
      }
      return<>
      <div className="header">
      {isAndroid  && <button className="connectBTN">
         <a href="https://metamask.app.link/dapp/sriche.netlify.app/">Click For Mobile</a>
        </button>  } 
       <button className="connectBTN" onClick={init} disabled={!connected}> {connected?"Connect Metamask":"Connected Metamask"}</button>
      </div>
      </>
}
export default Wallet;