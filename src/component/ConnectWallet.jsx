import { useState, useEffect } from "react";
import { showConnect } from "@stacks/connect";
import { userSession } from "../user-session";
import { appDetails } from "../stacks-config";

export default function ConnectWallet({ setAddress }) {
  const [userData, setUserData] = useState(null);

  const handleConnect = () => {
    showConnect({
      appDetails,
      userSession,
      onFinish: () => {
        const data = userSession.loadUserData();
        setUserData(data);
        setAddress(data.profile.stxAddress.testnet);
      },
    });
  };

  return (
    <div className="p-4">
      {!userData ? (
        <button onClick={handleConnect} className="bg-blue-600 text-white p-2 rounded">
          Connect Wallet
        </button>
      ) : (
        <div>Connected as: {userData.profile.stxAddress.testnet}</div>
      )}
    </div>
  );
}
