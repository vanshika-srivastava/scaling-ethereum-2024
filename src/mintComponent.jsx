import { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ethers } from "ethers";

function Mint() {
  const { primaryWallet } = useDynamicContext();
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);
  const [txHash, setTxHash] = useState(false);

  const handleSendTransaction = async () => {
    const address = document.getElementById("address").value;
    const amount = document.getElementById("amount").value;

    const signer = await primaryWallet.connector.ethers?.getSigner();

    const txRequest = {
      to: address,
      value: ethers.utils.parseEther(amount),
    };

    try {
      const txHash = await signer.sendTransaction(txRequest);
      setTxHash(txHash);
      console.log(`Transaction sent: ${txHash}`);
    } catch (error) {
      console.error(`Error sending transaction: ${error}`);
    }
  };

  useEffect(() => {
    const getNetworkAndBalance = async () => {
      const provider = await primaryWallet.connector.ethers?.getWeb3Provider();
      const signer = await primaryWallet.connector.ethers?.getSigner();

      if (!provider || !signer) {
        console.log("No provider or signer configured.");
        return;
      }

      const newNetwork = await provider.getNetwork();
      setNetwork(newNetwork);

      const newBalance = await signer.getBalance();
      setBalance(newBalance);
    };

    if (!primaryWallet) {
      console.log("No wallet configured.");
      return;
    }

    if (!network || !balance) {
      getNetworkAndBalance();
    }
  }, [primaryWallet, network, balance]);

  return (
    <>
      {network && <p>Network: {network?.name}</p>}
      {balance && <p>Balance: {ethers.utils.formatEther(balance)}</p>}
      <div>
        <label htmlFor="address">Address:</label>
        <input id="address" type="text" />

        <label htmlFor="amount">Amount:</label>
        <input id="amount" type="text" />

        <button onClick={() => handleSendTransaction()}>
          Send Transaction
        </button>
      </div>
      {txHash && <p>Latest Transaction Hash: {txHash}</p>}
    </>
  );
}

export default Mint;
