import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Currency = "USD" | "INR";

export interface PlanDetails {
  tier: string;
  price: string;
  buttonText: string;
  addOns: string;
  features: Array<{ text: string; available: boolean }>;
  isBeta?: boolean;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planDetails: PlanDetails | null;
  onPaymentClick: (currency: string, amount: string) => void;
}

const PaymentModal = ({
  isOpen,
  onClose,
  planDetails,
  onPaymentClick,
}: PaymentModalProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");

  const currencies = {
    USD: { symbol: "$", rate: 1 },
    INR: { symbol: "₹", rate: 80 },
  };

  const getPrice = () => {
    const basePrice = Number(planDetails?.price || 0);
    const price = basePrice * currencies[selectedCurrency].rate;
    return `${currencies[selectedCurrency].symbol}${price}`;
  };
  const [isAnimating, setIsAnimating] = useState(false);
  //const [bgColor, setBgColor] = useState("#ef5350");

  const handlePaymentClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      //setBgColor("#3b82f6");
      setIsAnimating(false);
      onPaymentClick(selectedCurrency, getPrice());
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Select Payment Currency
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <RadioGroup
            defaultValue="USD"
            value={selectedCurrency}
            onValueChange={(value: Currency) => setSelectedCurrency(value)}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="USD" id="usd" />
              <Label htmlFor="usd" className="font-medium">
                USD (US Dollar)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="INR" id="inr" />
              <Label htmlFor="inr" className="font-medium">
                INR (Indian Rupee)
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground">Selected Plan</div>
            <div className="font-medium">{planDetails?.tier} Plan</div>
            <div className="text-2xl font-bold mt-2">{getPrice()}</div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full py-3 px-6 text-lg" // Increased size via padding and larger text
          >
            Cancel
          </Button>
          <Button
            onClick={handlePaymentClick}
            className="relative overflow-hidden rounded-full text-white bg-[#ef5350] transition-colors duration-500 py-3 px-6 text-lg hover:bg-[#ef5350]"
            // Note: hover:bg-[#ef5350] ensures the background color stays the same on hover
          >
            {isAnimating && (
              <span
                className="absolute inset-0 rounded-full bg-blue-500 animate-slide"
                style={{ pointerEvents: "none" }}
              ></span>
            )}
            <span className="relative">Pay {getPrice()}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
