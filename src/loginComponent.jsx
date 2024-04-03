import React, { useState,useEffect } from "react";
import {
DynamicContextProvider,
  DynamicWidget,
  DynamicUserProfile,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";


const LoginComponent = () => {
  const { primaryWallet } = useDynamicContext();


  return (
    <div>
    <div>
          <DynamicWidget />
          <DynamicUserProfile />
    </div>
          {/* <p>{primaryWallet?.address}</p> */}
        
    </div>
  );
};

export default LoginComponent;
