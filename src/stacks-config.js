import { StacksTestnet } from '@stacks/network';

export const network = new StacksTestnet();
export const appDetails = {
  name: "Course Passport DApp",
  icon: window.location.origin + "/logo.png",
};
export const contractAddress = "ST15JMJYC2RFDKYX2RD7DRWWSXW6WZ3Z7VQZAEY0Z.badge-contract"; // your contract address
export const contractName = "badge-contract"; // your Clarity contract name
