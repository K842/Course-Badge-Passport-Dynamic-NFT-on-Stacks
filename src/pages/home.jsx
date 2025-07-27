
import React from "react";
import ConnectWallet from "../components/ConnectWallet";

const Home = ({ walletAddress, setWalletAddress, passportId }) => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Course Badge Passport</h1>
      <ConnectWallet
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      {passportId && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Passport ID:</p>
          <p className="text-sm text-gray-600">{passportId}</p>
        </div>
      )}
    </div>
  );
};

export default Home;