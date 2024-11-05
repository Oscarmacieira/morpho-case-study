import { TickSvg } from "@/components/svgs/TickSvg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessTxCardProps {
  amount: string;
  symbol: string;
  onClose: () => void;
}

export const SuccessTxCard = ({
  amount,
  symbol,
  onClose,
}: SuccessTxCardProps) => {
  return (
    <Card className="w-[350px] mx-auto mt-[100px] px-[20px] py-[50px]">
      <CardContent className="flex flex-col gap-4 items-center justify-center h-full p-0">
        <TickSvg className="w-[40px] h-[40px]" />
        <h1 className="font-inter text-center text-[14px] font-normal leading-[20px] text-success">
          Success!
        </h1>
        <p className="mb-4 text-center text-sm font-normal leading-5 text-alt opacity-70">
          You have received {Number(amount).toFixed(2)} ${symbol}.
        </p>
        <Button variant="gradient" className="w-full" onClick={onClose}>
          Reset
        </Button>
      </CardContent>
    </Card>
  );
};
