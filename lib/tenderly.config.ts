import { defineChain } from "viem";
import { envs } from "./envs";

export const tenderlyChain = defineChain({
  id: 1,
  name: "Morpho Case Study",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [envs.NEXT_PUBLIC_TENDERLY_VIRTUAL_MAINNET_RPC] },
  },
  blockExplorers: {
    default: {
      name: "Tenderly Explorer",
      url: "https://dashboard.tenderly.co/explorer/vnet/9d72d97e-bc21-41ed-8cd9-614336a9a582",
    },
  },
  contracts: {},
});
