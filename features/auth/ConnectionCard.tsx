import { LogoSvg } from "@/components/svgs/LogoSvg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConnectionCardProps {
  isLoading: boolean;
  onConnect: () => void;
}

export const ConnectionCard = ({
  isLoading,
  onConnect,
}: ConnectionCardProps) => {
  return (
    <Card className="w-[350px] aspect-square mx-auto mt-[250px]">
      <CardContent className="flex flex-col gap-4 items-center justify-center h-full">
        <LogoSvg />
        <h1 className="text-center text-xl font-normal leading-6 text-body opacity-95">
          Welcome to Morpho
        </h1>
        <p className="mb-4 text-center text-sm font-normal leading-5 text-alt opacity-70">
          To get started, please connect your wallet below
        </p>
        <Button
          variant="gradient"
          className="w-full"
          disabled={isLoading}
          onClick={onConnect}
        >
          {isLoading ? "Loading..." : "Connect Wallet"}
        </Button>
      </CardContent>
    </Card>
  );
};
