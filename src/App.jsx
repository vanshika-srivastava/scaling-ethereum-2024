import { useState } from 'react';
import LoginComponent, { handleFarcasterAuth, handleDynamicAuth } from './loginComponent';

function App() {
  const [authChoice, setAuthChoice] = useState(null);

  // Function to handle Farcaster Auth
  const handleFarcasterButtonClick = () => {
    setAuthChoice('farcaster');
    handleFarcasterAuth(); // Call the handleFarcasterAuth function
  };

  // Function to handle Dynamic Auth
  const handleDynamicButtonClick = () => {
    setAuthChoice('dynamic');
    handleDynamicAuth(); // Call the handleDynamicAuth function
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-700 to-purple-500">
      <div className="container flex flex-col items-center justify-center space-y-10 px-10 md:px-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Livestream on Farcaster</h1>
          <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Connect with a single wallet on Farcaster ENS or do a livestream.
          </p>
        </div>
        <div className="space-x-10">
          {/* Button for Farcaster Auth */}
          <button
            className="inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-white text-sm font-medium shadow-sm shadow transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            onClick={handleFarcasterButtonClick} 
          >
            Connect Farcaster Auth
          </button>
          
          {/* Button for Dynamic Auth */}
          <button
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white text-sm font-medium shadow-sm shadow transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            onClick={handleDynamicButtonClick}
          >
            Connect Dynamic Auth
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
