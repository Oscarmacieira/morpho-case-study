import { Address, erc20Abi, formatUnits } from "viem";
import { useReadContracts } from "wagmi";
import { useAccount } from "wagmi";
import { useMemo } from "react";
import MetaMorphoABI from "@/abis/MetaMorpho.abi";

export type VaultData = {
  // Metadata
  name?: string;
  symbol?: string;
  decimals?: number;
  asset?: Address;
  assetSymbol?: string;
  assetDecimals?: number;

  // User specific data
  userShares?: bigint;
  userAssets?: bigint;
  userMaxRedeem?: bigint;
  userMaxWithdraw?: bigint;

  // Formatted values (in decimals)
  formattedUserShares?: string;
  formattedUserAssets?: string;
  formattedMaxWithdraw?: string;

  // Status
  isLoading: boolean;
  isError: boolean;
};

export const useVaultDataQuery = (vaultAddress?: Address): VaultData => {
  const { address: userAddress } = useAccount();

  const { data, isLoading, isError } = useReadContracts({
    contracts: [
      // Vault Metadata
      {
        address: vaultAddress,
        abi: MetaMorphoABI,
        functionName: "name",
      },
      {
        address: vaultAddress,
        abi: MetaMorphoABI,
        functionName: "symbol",
      },
      {
        address: vaultAddress,
        abi: MetaMorphoABI,
        functionName: "decimals",
      },
      {
        address: vaultAddress,
        abi: MetaMorphoABI,
        functionName: "asset",
      },
      // User Data (only if user is connected)
      ...(userAddress
        ? [
            {
              address: vaultAddress,
              abi: MetaMorphoABI,
              functionName: "balanceOf",
              args: [userAddress],
            },
            {
              address: vaultAddress,
              abi: MetaMorphoABI,
              functionName: "maxRedeem",
              args: [userAddress],
            },
          ]
        : []),
    ],
    query: {
      enabled: Boolean(vaultAddress),
    },
  });

  // Second multicall for asset data once we have the asset address
  const assetAddress = data?.[3]?.result as Address | undefined;

  const {
    data: assetData,
    isLoading: isLoadingAsset,
    isError: isErrorAsset,
  } = useReadContracts({
    contracts: [
      {
        address: assetAddress,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: assetAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: Boolean(assetAddress),
    },
  });

  // Convert shares to assets if we have user shares
  const userShares = data?.[4]?.result as bigint | undefined;

  const {
    data: assetsData,
    isLoading: isLoadingAssets,
    isError: isErrorAssets,
  } = useReadContracts({
    contracts: [
      {
        address: vaultAddress,
        abi: MetaMorphoABI,
        functionName: "convertToAssets",
        args: [userShares || BigInt(0)],
      },
      {
        address: vaultAddress,
        abi: MetaMorphoABI,
        functionName: "convertToAssets",
        args: [(data?.[5]?.result as bigint) || BigInt(0)], // maxRedeem
      },
    ],
    query: {
      enabled: Boolean(userShares),
    },
  });

  return useMemo(() => {
    if (isLoading || isLoadingAsset || isLoadingAssets) {
      return { isLoading: true, isError: false };
    }

    if (isError || isErrorAsset || isErrorAssets) {
      return { isLoading: false, isError: true };
    }

    const vaultDecimals = Number(data?.[2]?.result || 18);
    const assetDecimals = Number(assetData?.[1]?.result || 18);

    return {
      // Metadata
      name: data?.[0]?.result as string,
      symbol: data?.[1]?.result as string,
      decimals: vaultDecimals,
      asset: assetAddress,
      assetSymbol: assetData?.[0]?.result as string,
      assetDecimals,

      // Raw Values
      userShares: userShares,
      userAssets: assetsData?.[0]?.result as bigint,
      userMaxRedeem: data?.[5]?.result as bigint,
      userMaxWithdraw: assetsData?.[1]?.result as bigint,

      // Formatted Values
      formattedUserShares: userShares
        ? formatUnits(userShares, vaultDecimals)
        : undefined,
      formattedUserAssets: assetsData?.[0]?.result
        ? formatUnits(assetsData[0].result as bigint, assetDecimals)
        : undefined,
      formattedMaxWithdraw: assetsData?.[1]?.result
        ? formatUnits(assetsData[1].result as bigint, assetDecimals)
        : undefined,

      isLoading: false,
      isError: false,
    };
  }, [
    data,
    assetData,
    assetsData,
    assetAddress,
    isLoading,
    isLoadingAsset,
    isLoadingAssets,
    isError,
    isErrorAsset,
    isErrorAssets,
  ]);
};
