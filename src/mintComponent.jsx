import { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ethers } from "ethers";

function Mint() {
  const { primaryWallet } = useDynamicContext();
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);

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
    </>
  );
}

export default Mint;
