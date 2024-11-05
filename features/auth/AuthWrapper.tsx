import { ConnectButton } from "@rainbow-me/rainbowkit";

export type AuthWrapperProps = {
  account?: {
    address: string;
    balanceDecimals?: number;
    balanceFormatted?: string;
    balanceSymbol?: string;
    displayBalance?: string;
    displayName: string;
    ensAvatar?: string;
    ensName?: string;
    hasPendingTransactions: boolean;
  };
  chain?: {
    hasIcon: boolean;
    iconUrl?: string;
    iconBackground?: string;
    id: number;
    name?: string;
    unsupported?: boolean;
  };
  openAccountModal: () => void;
  openChainModal: () => void;
  openConnectModal: () => void;
  accountModalOpen: boolean;
  chainModalOpen: boolean;
  connectModalOpen: boolean;
  mounted: boolean;
  authenticationStatus?: "loading" | "unauthenticated" | "authenticated";
};

export const AuthenticationWrapper = ({
  children,
}: {
  children: (props: AuthWrapperProps) => React.ReactNode;
}) => <ConnectButton.Custom>{(props) => children(props)}</ConnectButton.Custom>;
