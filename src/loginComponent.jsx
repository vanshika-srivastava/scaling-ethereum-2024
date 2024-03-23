import React, { useState } from 'react';
import {
  AuthKitProvider,
  SignInButton,
  useProfile
} from "@farcaster/auth-kit";
import {
  DynamicContextProvider,
  DynamicWidget,
  DynamicUserProfile,
  useDynamicContext
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';


const LoginComponent = ({ authChoice }) => {
  const [loginMethod, setLoginMethod] = useState(null);

  const handleFarcasterAuth = () => {
    // Implement Farcaster Auth logic here
    console.log("Farcaster Auth chosen");
  };

  const handleDynamicAuth = () => {
    // Implement Dynamic Auth logic here
    console.log("Dynamic Auth chosen");
  };

  return (
    <div>
      {authChoice === 'farcaster' && (
        <AuthKitProvider config={config}>
          <div style={{ position: "fixed", top: "12px", right: "12px" }}>
            <SignInButton />
          </div>
          <Profile />
        </AuthKitProvider>
      )}
      {authChoice === 'dynamic' && (
        <DynamicContextProvider
          settings={{
            environmentId: "1afe0b49-05c4-4994-b888-caaa23c178fc",
            walletConnectors: [ EthereumWalletConnectors ],
          }}
        >
          <DynamicWidget />
          <DynamicUserProfile />
          <ProfileDynamic />
        </DynamicContextProvider>
      )}
    </div>
  );
};

export const handleFarcasterAuth = () => {
  // Implement Farcaster Auth logic here
  console.log("Farcaster Auth chosen");
};

export const handleDynamicAuth = () => {
  // Implement Dynamic Auth logic here
  console.log("Dynamic Auth chosen");
};

function Profile() {
  const profile = useProfile();
  const {
    isAuthenticated,
    profile: { fid, displayName, custody },
  } = profile;

  return (
    <>
      {isAuthenticated ? (
        <div>
          <p>
            Hello, {displayName}! Your FID is {fid}.
          </p>
          <p>
            Your custody address is: <pre>{custody}</pre>
          </p>
        </div>
      ) : (
        <p>
          Click the "Sign in with Farcaster" button above, then scan the QR code
          to sign in.
        </p>
      )}
    </>
  );
}

function ProfileDynamic() {
  const { showDynamicUserProfile } = useDynamicContext();
  
  // Logic for handling profile details when Dynamic Auth is chosen
  // You can use showDynamicUserProfile to trigger actions when the widget opens or closes
  
  return null; // or render your profile details component here
}

export default LoginComponent;
