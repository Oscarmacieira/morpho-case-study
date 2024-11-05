import { useWriteContract } from "wagmi";
import { Address } from "viem";
import MetaMorphoABI from "@/abis/MetaMorpho.abi";
import { useVaultDataQuery } from "./useVaultDataQuery";

export const useWithdrawMaxMutation = (vaultAddress?: Address) => {
  const { writeContractAsync } = useWriteContract();

  const withdraw = async (userMaxRedeem?: bigint) => {
    if (!vaultAddress || !userMaxRedeem) return;

    try {
      const tx = await writeContractAsync({
        address: vaultAddress,
        abi: MetaMorphoABI,
        functionName: "redeem",
        args: [
          userMaxRedeem,
          window.ethereum.selectedAddress,
          window.ethereum.selectedAddress,
        ],
      });

      return tx;
    } catch (error) {
      console.error("Error withdrawing max:", error);
      throw error;
    }
  };

  return {
    withdraw,
  };
};
