import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  text: string;
  available: boolean;
}

export interface PricingCardProps {
  tier: string;
  price: string;
  features: Feature[];
  addOns?: string;
  buttonText: string;
  isBeta?: boolean;
  onButtonClick?: () => void;
  className?: string;
}

const PricingCard = ({
  tier,
  price,
  features,
  addOns,
  buttonText,
  isBeta,
  onButtonClick,
  className,
}: PricingCardProps) => (
  <Card
    className={cn("relative", isBeta && "border-2 border-blue-600", className)}
  >
    {isBeta && (
      <Badge
        variant="default"
        className="absolute top-0 right-0 transform translate-x-[30px] -translate-y-[1px] bg-blue-600 rotate-45 text-white text-xs font-bold py-1 px-3"
      >
        Best Value
      </Badge>
    )}
    <CardHeader>
      <CardTitle className="flex flex-col gap-2">
        <span className="text-2xl font-bold">{tier}</span>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground m1-1">/month</span>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {addOns && (
        <div className="bg-muted p-3 rounded-lg">
          <p className="text-sm font-semibold">ADD ONS</p>
          <p className="texxt-sm text-muted-foreground">{addOns}</p>
        </div>
      )}

      <Button
        className={cn(
          "w-full",
          tier === "Free" && "bg-black hover:bg-black/90"
        )}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
      {tier !== "Free" && (
        <p className="text-xs text-muted-foreground text-center">
          *Billed monthly untill cancelled
        </p>
      )}

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            {feature.available ? (
              <Check className="h-4 w-4 text-foreground" />
            ) : (
              <X className="h-4 w-4 text-muted-foreground" />
            )}
            <span
              className={cn(
                "text-sm",
                feature.available ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default PricingCard;
