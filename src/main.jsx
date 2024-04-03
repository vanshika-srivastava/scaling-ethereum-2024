import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { EthersExtension } from "@dynamic-labs/ethers-v5";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: "4e598b41-f388-489b-a0b3-d24064b1d1ed",
        walletConnectors: [EthereumWalletConnectors],
        walletConnectorExtensions: [EthersExtension],
      }}
    >
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);
