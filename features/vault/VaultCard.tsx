import { Card, CardContent } from "@/components/ui/card";
import { useVaultDataQuery } from "./useVaultDataQuery";
import { FC } from "react";
import { Address } from "viem";
import { Button } from "@/components/ui/button";

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
      <p>
        {amount} ${symbol}
      </p>
    </div>
  );
};

type VaultCardProps = {
  vaultAddress: Address;
};

export const VaultCard: FC<VaultCardProps> = ({ vaultAddress }) => {
  const {
    isLoading,
    name,
    symbol,
    assetSymbol,
    formattedUserAssets,
    formattedUserShares,
  } = useVaultDataQuery(vaultAddress);

  if (isLoading) {
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
        <Button variant="gradient">Withdraw User Max</Button>
      </CardContent>
    </Card>
  );
};
