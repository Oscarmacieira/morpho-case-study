import { AlertSvg } from "@/components/svgs/AlertSvg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorTxCardProps {
  onClose: () => void;
}

export const ErrorTxCard = ({ onClose }: ErrorTxCardProps) => {
  return (
    <Card className="w-[350px] mx-auto mt-[100px] px-[20px] py-[50px]">
      <CardContent className="flex flex-col gap-4 items-center justify-center h-full p-0">
        <AlertSvg className="w-[40px] h-[40px]" />
        <h1 className="font-inter text-center text-[14px] font-normal leading-[20px] text-destructive">
          Oh no!
        </h1>
        <p className="mb-4 text-center text-sm font-normal leading-5 text-alt opacity-70">
          Please try again.
        </p>
        <Button variant="gradient" className="w-full" onClick={onClose}>
          Retry
        </Button>
      </CardContent>
    </Card>
  );
};
