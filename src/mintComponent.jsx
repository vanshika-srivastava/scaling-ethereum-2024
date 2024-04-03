import React, { useState, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ethers } from "ethers";
import abi from './smartcontract/utils/abi.json'

function Mint() {
  const { primaryWallet } = useDynamicContext();
  const [txHash, setTxHash] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      // Initialize your NFT contract here
    //   const nftAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
      const nftAddress = "0x34348d42902a668C72372a91773E4133f7191f98" ;
      const signer = await primaryWallet.connector.ethers?.getSigner();
      const provider = await primaryWallet.connector.ethers?.getWeb3Provider();
      const contract = new ethers.Contract(nftAddress, abi, signer);
      setContract(contract);
    };

    initializeContract();
  }, [primaryWallet]);

  const handleMint = async () => {
    if (!contract) {
      console.error("NFT contract is not initialized");
      return;
    }
  
    console.log("Contract is initialized:", contract);
  
    try {
      const txRequest = await contract.mint();
      const signer = await primaryWallet.connector.ethers?.getSigner();
      const tx = await signer.sendTransaction(txRequest);
      setTxHash(tx.hash);
      console.log(`Transaction sent: ${tx.hash}`);
    } catch (error) {
      console.error(`Error sending transaction: ${error}`);
    }
  };
  

  return (
    <div className="flex justify-center items-center ">
      <button
        onClick={handleMint}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded"
      >
        Mint NFT
      </button>
      {txHash && (
        <div className="mt-4">
          Transaction Hash:{" "}
          <a
            href={`https://etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {txHash}
          </a>
        </div>
      )}
    </div>
  );
}

export default Mint;
