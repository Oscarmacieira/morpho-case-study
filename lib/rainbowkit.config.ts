import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { envs } from "./envs";
import { tenderlyChain } from "./tenderly.config";

export const rainbowkitConfig = getDefaultConfig({
  appName: "Morpho Case Study",
  projectId: envs.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID,
  chains: [tenderlyChain],
  ssr: false,
});
