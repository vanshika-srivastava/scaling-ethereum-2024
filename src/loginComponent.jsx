import React, { useState,useEffect } from "react";
import {
  DynamicContextProvider,
  DynamicWidget,
  DynamicUserProfile,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { EthersExtension } from "@dynamic-labs/ethers-v5";

let address = "";

const LoginComponent = () => {


  return (
    <div>
        <DynamicContextProvider
          settings={{
            environmentId: "1afe0b49-05c4-4994-b888-caaa23c178fc",
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          <DynamicWidget />
          <DynamicUserProfile />
          <ProfileDynamic />
        </DynamicContextProvider>
        
    </div>
  );
};

function ProfileDynamic() {
  const { primaryWallet } = useDynamicContext();
 
  useEffect(() => {
    if (primaryWallet && primaryWallet.address) {
      address = primaryWallet.address; // Updating the address variable
    }
  }, [primaryWallet]);

  // Logic for handling profile details when Dynamic Auth is chosen
  // You can use showDynamicUserProfile to trigger actions when the widget opens or closes

  return null; // Since there's no JSX to return in this example
}

export { address }; 

export default LoginComponent;
