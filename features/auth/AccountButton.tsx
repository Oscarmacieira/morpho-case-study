"use client";

import { Button } from "@/components/ui/button";
import { displayEvmAddress } from "@/lib/formatters/displayEvmAddress";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const AccountIcon = () => {
  return (
    <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#A3C3FF] to-[#2470FF] ring-1 ring-[#A3C3FF]/30 ring-offset-2 ring-offset-transparent" />
  );
};

export const AccountButton = () => {
  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();
  return (
    <Button
      className="bg-[#191D200F] rounded-[3px] text-primary hover:bg-[#191D201A]"
      onClick={openAccountModal}
    >
      <AccountIcon />
      {address ? displayEvmAddress(address) : "Connect Wallet"}
    </Button>
  );
};
