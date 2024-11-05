import { AlertSvg } from "@/components/svgs/AlertSvg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WrongNetworkCardProps {
  isLoading: boolean;
  onSwitch: () => void;
}

export const WrongNetworkCard = ({
  isLoading,
  onSwitch,
}: WrongNetworkCardProps) => {
  return (
    <Card className="w-[350px] aspect-square mx-auto mt-[250px]">
      <CardContent className="flex flex-col gap-4 items-center justify-center h-full">
        <AlertSvg />
        <h1 className="text-center text-xl font-normal leading-6 text-body opacity-95">
          Wrong network
        </h1>
        <p className="mb-4 text-center text-sm font-normal leading-5 text-alt opacity-70">
          You are not on Mainnet. Please click the button below to switch.
        </p>
        <Button
          variant="gradient"
          className="w-full"
          disabled={isLoading}
          onClick={onSwitch}
        >
          {isLoading ? "Loading..." : "Switch"}
        </Button>
      </CardContent>
    </Card>
  );
};
