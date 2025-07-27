import {
  callReadOnlyFunction,
  callContractFunction,
  stringAsciiCV,
  uintCV,
} from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../abi/contract-details';

export async function fetchPassport(userAddress) {
  const response = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-user-passport',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
    senderAddress: userAddress,
  });
  return response;
}
