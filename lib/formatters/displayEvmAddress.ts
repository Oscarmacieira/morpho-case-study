import { Address } from "viem";

export const displayEvmAddress = (address: Address): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
