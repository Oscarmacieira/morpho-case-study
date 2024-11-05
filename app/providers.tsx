"use client";

import { TransactionProvider } from "@/features/transaction/TxProvider";
import { VaultProvider } from "@/features/vault/VaultProvider";
import { rainbowkitConfig } from "@/lib/rainbowkit.config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={rainbowkitConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <TransactionProvider>
            <VaultProvider>{children}</VaultProvider>
          </TransactionProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
