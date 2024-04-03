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
          <DynamicWidget />
          <DynamicUserProfile />
          <ProfileDynamic />
        
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


export default LoginComponent;
