import React, { useState } from "react";
import LoginComponent from "./loginComponent";

function App() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-300 to-blue-500">
      <div className="container flex flex-col items-center justify-center space-y-10 px-10 md:px-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Scaling Ethereum Workshop 2024
          </h1>
          </div>
          <div className="text-center space-y-10">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Build UX simplified dApps on Gnosis Chain
          </h1>
        </div>
        <LoginComponent/>

        </div>
      </div>

  );
}

export default App;
