import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ethers } from "ethers";
import abi from "./smartcontract/utils/abi.json";

function Mint() {
  const { primaryWallet } = useDynamicContext();
  const [txHash, setTxHash] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      // Initialize your NFT contract here
      //   const nftAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
      const nftAddress = "0x3f6E49B7A4d8e5722cFd10DD4e1E4E362238dE7e";
      const signer = await primaryWallet.connector.ethers?.getSigner();
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

    try {
      const txReceipt = await contract.mint();

      console.log("Transaction receipt:", txReceipt);

      // Listen for transaction confirmation
      const provider = await primaryWallet.connector.ethers?.getWeb3Provider();
      const txProcessed = await provider.waitForTransaction(txReceipt.hash);

      console.log("Transaction processed:", txProcessed);

      // Set the transaction hash once confirmed
      setTxHash(txReceipt.hash);
      toast.success(
        <div>
          <p>Congrats, you minted your dynamic nft! 🎉</p>
          <p>Transaction Hash:</p>
          <p>
            <a
              href={`https://gnosis.blockscout.com/tx/${txProcessed.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {txReceipt.hash}
            </a>
          </p>
        </div>
      );
    } catch (error) {
      console.error(`Error sending transaction: ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        onClick={handleMint}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-3 rounded mt-4"
      >
        Mint your Dynamic NFT
      </button>
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <button
          onClick={() =>
            window.open("https://faucet.gnosischain.com/", "_blank")
          }
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Gnosis Chain Faucet
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Mint;
