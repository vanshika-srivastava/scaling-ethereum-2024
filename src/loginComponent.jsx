import React, { useState,useEffect } from "react";
import {
DynamicContextProvider,
  DynamicWidget,
  DynamicUserProfile,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

import Mint from "./mintComponent";

const LoginComponent = () => {
  const isLoggedIn = useIsLoggedIn();
  const { primaryWallet } = useDynamicContext();


  return (
    <div>
    <div>
          <DynamicWidget />
          <DynamicUserProfile />
    </div>
          {/* <p>{primaryWallet?.address}</p> */}

          {isLoggedIn && <Mint />}
        
    </div>
  );
};

export default LoginComponent;
