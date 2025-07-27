import { contractAddress, contractName, network } from "../stacks-config";
import { openContractCall } from "@stacks/connect";
import { standardPrincipalCV } from "@stacks/transactions";
import { userSession } from "../user-session";

export default function MintPassport() {
  const callGetOrCreatePassport = async () => {
    await openContractCall({
      contractAddress,
      contractName,
      functionName: "get-or-create-passport",
      functionArgs: [],
      network,
      appDetails: {
        name: "Course Passport DApp",
        icon: window.location.origin + "/logo.png",
      },
      onFinish: (data) => {
        console.log("Transaction complete:", data);
        alert("Passport created! TX: " + data.txId);
      },
    });
  };

  return (
    <button onClick={callGetOrCreatePassport} className="bg-green-500 p-2 text-white rounded">
      Mint Passport
    </button>
  );
}
