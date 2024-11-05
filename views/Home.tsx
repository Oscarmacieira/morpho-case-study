"use client";

import { FC } from "react";
import {
  AuthWrapperProps,
  AuthenticationWrapper,
} from "@/features/auth/AuthWrapper";
import { ConnectionCard } from "@/features/auth/ConnectionCard";
import { WrongNetworkCard } from "@/features/auth/WrongNetworkCard";
import { Header } from "@/features/layout/header";

const Connected: FC = () => (
  <div>
    <Header />
    <main>
      <div></div>
    </main>
  </div>
);

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
