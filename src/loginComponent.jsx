import React, { useState } from "react";
import {
  DynamicContextProvider,
  DynamicWidget,
  DynamicUserProfile,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { EthersExtension } from "@dynamic-labs/ethers-v5";

const LoginComponent = () => {
  console.log("rendering LoginComponent");
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
  const { showDynamicUserProfile } = useDynamicContext();

  // Logic for handling profile details when Dynamic Auth is chosen
  // You can use showDynamicUserProfile to trigger actions when the widget opens or closes

  return null; // or render your profile details component here
}

export default LoginComponent;
