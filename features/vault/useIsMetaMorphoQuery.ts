import { envs } from "@/lib/envs";
import { Address, isAddress } from "viem";
import { useReadContract } from "wagmi";

/**
 * Custom hook to check if an address is a MetaMorpho vault
 * @param address The address to check
 * @returns The result of the contract read operation
 */
export function useIsMetaMorphoQuery(address: Address | undefined) {
  const isValidAddress = address && isAddress(address);

  return useReadContract({
    address: envs.NEXT_PUBLIC_MM_FACTORY_ADDRESS as Address,
    abi: [
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "isMetaMorpho",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "isMetaMorpho",
    args: isValidAddress ? [address] : undefined,
    query: {
      enabled: isValidAddress,
    },
  });
}
