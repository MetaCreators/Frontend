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
import PaymentModal from "@/components/pricing/PaymentModal";
import { PlanDetails } from "@/components/pricing/PaymentModal";
import BankDetailsModal from "@/components/pricing/BankDetailsModal";
import { toast } from "sonner";
import { RazorpayOptions } from '../../types/razorpay';


const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [isBankDetailsModalOpen, setIsBankDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const [additionalCredits, setAdditionalCredits] = useState(0);

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

  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiateRazorpayPayment = async (amount: string, planName: string, currency:string) => {
    try {
      setIsLoading(true);
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      if (!res) {
        alert('Razorpay failed to load!');
        return;
      }

      // Fetch order details from your backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/razorpay/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: currency === "USD" ? parseInt(amount) : parseInt(amount) * 100, // Convert to paise
          plan: planName,
          currency: currency
        }),
      });

      const data = await response.json();
      console.log('Order data:', data);

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Lithouse",
        description: `${planName} Plan Subscription`,
        image: "your-logo-url",
        order_id: data.orderId,
        // callback_url: 'http://localhost:3000/payment-success',
        notes: {
          address: "Lithouse Office"
        },
        theme: {
          color: "#3399cc"
        },
        handler: function (response) {
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: "7cba94fe-b329-4968-8c8b-a8f18e62943c",
              creditAmount: 10,
            })
          }).then(res => res.json())
            .then(data => {
              if (data.status === 'ok') {
                window.location.href = '/payment';
              } else {
                alert('Payment verification failed');
              }
            }).catch(error => {
              console.error('Error:', error);
              alert('Error verifying payment');
            });
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.success', (response: any) => {
        console.log('Payment successful:', response);
       toast.success(`Successfully added 10 credits to your account!`);
        setIsLoading(false);
      });

      paymentObject.on('payment.failed', () => {
        toast.error('Failed to add credits. Please try again.');
        setIsLoading(false);
      });
      console.log("user id is ", data.userId); //this is wrong
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanSelect = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };
  //BUG: AFTER PAYMENT, REDIRECT ISNT WORKING

  const handlePaymentClick = async (currency: string, amount: string) => {
    try {
      console.log(`Processing payment of ${amount} in ${currency}`);
      await initiateRazorpayPayment(amount, selectedPlan?.tier || "", currency);

      setIsModalOpen(false);
    } catch (error) {
      console.error("Payment failed:", error);
    }
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
                  <Link to="/dashboard">Home</Link>
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
        isLoading={isLoading}
      />
      <BankDetailsModal
        isOpen={isBankDetailsModalOpen}
        onClose={() => setIsBankDetailsModalOpen(false)}
      />
    </div>
  );
};

export default Pricing;
