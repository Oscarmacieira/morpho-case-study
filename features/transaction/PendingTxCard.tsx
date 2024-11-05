import { AlertSvg } from "@/components/svgs/AlertSvg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface PendingTxCardProps {
  txHash: string;
}

export const PendingTxCard = ({ txHash }: PendingTxCardProps) => {
  return (
    <Card className="w-[350px] aspect-square mx-auto mt-[100px]">
      <CardContent className="flex flex-col gap-4 items-center justify-center h-full">
        <h1 className="font-inter text-center text-[14px] font-normal leading-[20px] text-body opacity-95">
          Your transaction is pending
        </h1>
        <p className="mb-4 text-center text-sm font-normal leading-5 text-alt opacity-70">
          View on{" "}
          <Link
            className="underline"
            href={`https://etherscan.io/tx/${txHash}`}
          >
            Etherscan -{">"}
          </Link>
        </p>
        <Button variant="gradient" className="w-full" disabled>
          Transaction finalizing...
        </Button>
      </CardContent>
    </Card>
  );
};
