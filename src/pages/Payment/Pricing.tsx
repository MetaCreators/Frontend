import PricingCard from "@/components/pricing/PricingCard";
import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const pricingData = {
    plus: {
      tier: "Plus",
      price: "35",
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
      price: "60",
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
      price: "120",
      buttonText: "Get Generative",
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

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>payment</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
                Monthly
              </AnimatedButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PricingCard
              {...pricingData.plus}
              onButtonClick={() => console.log("Plus plan selected")}
            />
            <PricingCard
              {...pricingData.max}
              onButtonClick={() => console.log("Max plan selected")}
            />
            <PricingCard
              {...pricingData.pro}
              onButtonClick={() => console.log("Pro plan selected")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
