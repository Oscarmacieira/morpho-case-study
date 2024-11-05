"use client";

import { FC } from "react";
import {
  AuthWrapperProps,
  AuthenticationWrapper,
} from "@/features/auth/AuthWrapper";
import { ConnectionCard } from "@/features/auth/ConnectionCard";
import { WrongNetworkCard } from "@/features/auth/WrongNetworkCard";
import { VaultAddressInput } from "@/features/vault/VaultAddressInput";
import { Navbar } from "@/features/layout/Navbar";
import { PendingTxCard } from "@/features/transaction/PendingTxCard";
import { SuccessTxCard } from "@/features/transaction/SuccessTxCard";
import { useVault } from "@/features/vault/VaultProvider";
import { useTransaction } from "@/features/transaction/TxProvider";
import { ErrorTxCard } from "@/features/transaction/ErrorTxCard";
import { VaultCard } from "@/features/vault/VaultCard";

const Connected: FC = () => {
  const { state, reset } = useTransaction();
  const { assetSymbol, formattedUserAssets } = useVault();

  if (state.status !== "idle") {
    return (
      <div>
        <Navbar />
        <main>
          {state.status === "pending" && state.txHash && (
            <PendingTxCard txHash={state.txHash} />
          )}
          {state.status === "success" && (
            <SuccessTxCard
              amount={formattedUserAssets || "0"}
              symbol={assetSymbol || ""}
              onClose={reset}
            />
          )}
          {state.status === "error" && <ErrorTxCard onClose={reset} />}
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main>
        <div className="flex flex-col">
          <VaultAddressInput />
          <br />
          <VaultCard />
        </div>
      </main>
    </div>
  );
};

interface AuthenticationContentProps extends AuthWrapperProps {}

const AuthenticationContent: FC<AuthenticationContentProps> = ({
  account,
  chain,
  openChainModal,
  openConnectModal,
  authenticationStatus,
  mounted,
}) => {
  const isLoading = authenticationStatus === "loading";
  const isReady = mounted && !isLoading;
  const isConnected =
    isReady &&
    account &&
    chain &&
    (!authenticationStatus || authenticationStatus === "authenticated");

  if (!isReady) {
    return null;
  }

  if (!account) {
    return (
      <ConnectionCard isLoading={isLoading} onConnect={openConnectModal} />
    );
  }

  if (chain?.unsupported) {
    return <WrongNetworkCard isLoading={isLoading} onSwitch={openChainModal} />;
  }

  if (isConnected) {
    return <Connected />;
  }

  return null;
};

const Home: FC = () => (
  <AuthenticationWrapper>
    {(props) => (
      <main>
        <AuthenticationContent {...props} />
      </main>
    )}
  </AuthenticationWrapper>
);

export default Home;
