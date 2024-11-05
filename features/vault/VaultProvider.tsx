import React, { createContext, useContext, ReactNode, useState } from "react";
import { Address } from "viem";
import { useVaultDataQuery } from "./useVaultDataQuery";

type VaultContextType = {
  vaultAddress: Address | undefined;
  setVaultAddress: (address: Address | undefined) => void;
  isLoading: boolean;
  name?: string;
  symbol?: string;
  assetSymbol?: string;
  formattedUserAssets?: string;
  formattedUserShares?: string;
  userMaxRedeem?: bigint;
};

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error("useVault must be used within a VaultProvider");
  }
  return context;
};

interface VaultProviderProps {
  children: ReactNode;
}

export const VaultProvider: React.FC<VaultProviderProps> = ({ children }) => {
  const [vaultAddress, setVaultAddress] = useState<Address | undefined>();

  const {
    isLoading,
    name,
    symbol,
    assetSymbol,
    formattedUserAssets,
    formattedUserShares,
    userMaxRedeem,
  } = useVaultDataQuery(vaultAddress);

  return (
    <VaultContext.Provider
      value={{
        vaultAddress,
        setVaultAddress,
        isLoading,
        name,
        symbol,
        assetSymbol,
        formattedUserAssets,
        formattedUserShares,
        userMaxRedeem,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};
