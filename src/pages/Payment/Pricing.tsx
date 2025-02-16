import PricingCard from "@/components/pricing/PricingCard";
import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import PaymentModal from "@/components/pricing/PaymentModal";
import { PlanDetails } from "@/components/pricing/PaymentModal";
import BankDetailsModal from "@/components/pricing/BankDetailsModal";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [isBankDetailsModalOpen, setIsBankDetailsModalOpen] = useState(false);

  const pricingData = {
    plus: {
      tier: "Plus",
      price: "16",
      buttonText: "Get Plus",
      addOns: "1x Boost, 60s Generative",
      features: [
        { text: "50 mins/mo of AI generation", available: true },
        { text: "80/mo iStock", available: true },
        { text: "60s Generative credits", available: true },
        { text: "100 GB storage", available: true },
        { text: "Unlimited exports", available: true },
        { text: "2 voice clones", available: true },
        { text: "Upto 1 user", available: true },
      ],
    },
    max: {
      tier: "Max",
      price: "27",
      buttonText: "Get Max",
      addOns: "1x Boost, 60s Generative",
      features: [
        { text: "200 mins/mo of AI generation", available: true },
        { text: "320/mo iStock", available: true },
        { text: "60s Generative credits", available: true },
        { text: "400 GB storage", available: true },
        { text: "Unlimited exports", available: true },
        { text: "5 voice clones", available: true },
        { text: "Upto 1 user", available: true },
      ],
    },
    pro: {
      tier: "Pro",
      price: "35",
      buttonText: "Get Pro",
      addOns: "1x Boost, 15m Generative",
      features: [
        { text: "200 mins/mo of AI generation", available: true },
        { text: "320/mo iStock", available: true },
        { text: "15m Generative credits", available: true },
        { text: "400 GB storage", available: true },
        { text: "Unlimited exports", available: true },
        { text: "5 voice clones", available: true },
        { text: "Upto 1 user", available: true },
      ],
      isBeta: true,
    },
  };

  const handlePlanSelect = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handlePaymentClick = async (currency: string, amount: string) => {
    try {
      console.log(`Processing payment of ${amount} in ${currency}`);

      // Add your payment processing logic here
      //await processPayment(currency, amount);

      // Redirect based on plan
      if (selectedPlan && currency === "INR") {
        switch (selectedPlan.tier.toLowerCase()) {
          case "plus":
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSdsoI7L4J_be6p7ScqZ5qMcHbKmykqFSLP2zwqiYx95PuwnhA/viewform?usp=pp_url&entry.1282954660=1280",
              "_blank"
            );
            break;
          case "max":
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSdNJqSNfRmuL4OHVZrKgnNnCi69Sv86tzab52hlZkcUFojLGw/viewform?usp=pp_url&entry.1282954660=2160",
              "_blank"
            );
            break;
          case "pro":
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSehJkCdVclOygRyaxA7acSUcMHVdm9irxL4k3PQy7OULguB9w/viewform?usp=pp_url&entry.1282954660=2800",
              "_blank"
            );
            break;
          default:
            console.error("Unknown plan tier");
        }
      } else if (selectedPlan && currency === "USD") {
        setIsModalOpen(false);
        setIsBankDetailsModalOpen(true);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle payment failure
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            Your <span className="text-purple-600">AI co-pilot</span> for video
            creation
          </h1>

          <div className="flex justify-center mb-8">
            <div className="bg-muted p-1 rounded-full inline-flex gap-3">
              <AnimatedButton
                selected={billingPeriod === "monthly"}
                onClick={() => setBillingPeriod("monthly")}
              >
                One-Time
              </AnimatedButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PricingCard
              {...pricingData.plus}
              onButtonClick={() => handlePlanSelect(pricingData.plus)}
            />
            <PricingCard
              {...pricingData.max}
              onButtonClick={() => handlePlanSelect(pricingData.max)}
            />
            <PricingCard
              {...pricingData.pro}
              onButtonClick={() => handlePlanSelect(pricingData.pro)}
            />
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planDetails={selectedPlan}
        onPaymentClick={handlePaymentClick}
      />
      <BankDetailsModal
        isOpen={isBankDetailsModalOpen}
        onClose={() => setIsBankDetailsModalOpen(false)}
      />
    </div>
  );
};

export default Pricing;
