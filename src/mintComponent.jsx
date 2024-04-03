import React, { useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { address } from "./loginComponent"; // Importing ProfileDynamic component
import { ethers } from "ethers";

function Mint() {
    const { rpcProviders } = useDynamicContext();
    const rpcProvider = rpcProviders.evmProviders[1];
    // console.log(rpcProvider);

    useEffect(() => {
        if (!rpcProvider) {
            console.log("No EVM Providers configured.");
            return;
        }

        const web3Provider = rpcProvider.provider;
        const provider = new ethers.providers.JsonRpcProvider(web3Provider);

        // Now you can interact with Ethereum using 'provider'

        // Example: Get the current network
        provider.getNetwork().then(network => {
            console.log("Connected to network:", network);
        }).catch(error => {
            console.error("Error getting network:", error);
        });

        const signer = provider.getSigner(); // Get a signer from the provider
        signer.getAddress().then(address => {
            provider.getBalance(address).then(balance => {
                console.log("Balance of address", address, ":", ethers.utils.formatEther(balance));
            }).catch(error => {
                console.error("Error getting balance:", error);
            });
        }).catch(error => {
            console.error("Error getting address:", error);
        });

        // You can perform other interactions with Ethereum here

    }, [rpcProvider]); // Ensure this effect runs when 'rpcProvider' changes

    return null; // You may return JSX if needed
}

export default Mint;
