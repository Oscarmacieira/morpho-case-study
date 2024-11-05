import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { envs } from "./envs";
import { tenderlyChain } from "./tenderly.config";
import {
  rabbyWallet,
  metaMaskWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";

export const rainbowkitConfig = getDefaultConfig({
  appName: "Morpho Case Study",
  projectId: envs.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID,
  chains: [tenderlyChain],
  wallets: [
    {
      groupName: "Popular",
      wallets: [metaMaskWallet, rabbyWallet, okxWallet],
    },
  ],
  ssr: true,
});
