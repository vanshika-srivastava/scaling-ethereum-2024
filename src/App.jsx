import { useState } from "react";
import { handleDynamicAuth } from "./loginComponent"; // Import the handleDynamicAuth function
import LoginComponent from "./loginComponent";

function App() {
  const [authChoice, setAuthChoice] = useState(null);

  // Function to handle Dynamic Auth
  const handleDynamicButtonClick = () => {
    setAuthChoice("dynamic");
    handleDynamicAuth(); // Call the handleDynamicAuth function
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-700 to-purple-500">
      <div className="container flex flex-col items-center justify-center space-y-10 px-10 md:px-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Livestream on Farcaster
          </h1>
          <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Connect with a single wallet on Farcaster ENS or do a livestream.
          </p>
        </div>
        <div className="space-x-10">

          {authChoice && <LoginComponent authChoice={authChoice} />}
        </div>
      </div>
    </div>
  );
}

export default App;
