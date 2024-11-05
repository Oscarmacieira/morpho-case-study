import { Card, CardContent } from "@/components/ui/card";
import { useVaultDataQuery } from "./useVaultDataQuery";
import { FC } from "react";
import { Address } from "viem";
import { Button } from "@/components/ui/button";
import { useWithdrawMaxMutation } from "./useWithdrawMaxMutation";
import { waitForTransactionReceipt } from "wagmi/actions";
import { rainbowkitConfig } from "@/lib/rainbowkit.config";
import { PendingTxCard } from "../transaction/PendingTxCard";
import { SuccessTxCard } from "../transaction/SuccessTxCard";
import { ErrorTxCard } from "../transaction/ErrorTxCard";
import { useTransactionState } from "../transaction/useTxState";
import { useTransaction } from "../transaction/TxProvider";
import { useVault } from "./VaultProvider";

type VaultCardContentProps = {
  amount?: string;
  symbol?: string;
  title: string;
};

const VaultCardContent: FC<VaultCardContentProps> = ({
  amount,
  symbol,
  title,
}) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="font-inter font-medium text-[11px] leading-[16px] text-[hsla(206,11%,29%,0.5)]">
        {title}
      </p>
      <p>{`${Number(amount ?? "0").toFixed(2)} $${symbol}`}</p>
    </div>
  );
};

export const VaultCard: FC = () => {
  const {
    vaultAddress,
    isLoading,
    name,
    symbol,
    assetSymbol,
    formattedUserAssets,
    formattedUserShares,
    userMaxRedeem,
  } = useVault();

  const { withdraw } = useWithdrawMaxMutation(vaultAddress);
  const { setPending, setSuccess, setError } = useTransaction();

  const handleWithdraw = async () => {
    try {
      const tx = await withdraw(userMaxRedeem);
      if (!tx) return;

      setPending(tx);

      const receipt = await waitForTransactionReceipt(rainbowkitConfig, {
        hash: tx,
      });

      if (receipt.status === "success") {
        setSuccess();
      } else {
        setError(new Error("Transaction failed"));
      }
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    }
  };

  if (isLoading || !vaultAddress) {
    return null;
  }

  return (
    <Card className="w-[350px] mx-auto">
      <CardContent className="py-[50px] px-[20px] flex flex-col gap-[25px]">
        <h3 className="font-inter font-normal text-[20px] leading-[24px]">
          {name}
        </h3>
        <VaultCardContent
          amount={formattedUserShares}
          symbol={symbol}
          title="User Shares"
        />
        <VaultCardContent
          amount={formattedUserAssets}
          symbol={assetSymbol}
          title="User Assets"
        />
        <Button
          variant="gradient"
          disabled={userMaxRedeem === BigInt(0)}
          onClick={() => handleWithdraw()}
        >
          Withdraw User Max
        </Button>
      </CardContent>
    </Card>
  );
};
