import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/Navbar";

// Define TypeScript interface for Razorpay options
interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  callback_url: string;
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

// Define TypeScript interface for window with Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      close: () => void;
      on: (event: string, handler: (response: any) => void) => void;
    };
  }
}

const RazorpayPayment: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
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
      });

      const data = await response.json();
      console.log('Order data:', data);

      const options: RazorpayOptions = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount, 
            currency: data.currency,
            name: "MetaCreators",
            description: "Image Generation Credits",
            image: "your-logo-url",
            order_id: data.orderId,
            callback_url: `${import.meta.env.VITE_FRONTEND_URL}razorpay`,
            notes: {
                address: "MetaCreators Office"
            },
            theme: {
                color: "#3399cc"
            }
        };

      const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
        paymentObject.on('payment.success', (response: any) => {
            console.log('Payment successful:', response);
            alert('Payment successful!');
            setIsLoading(false);
        });

        paymentObject.on('payment.failed', (response: any) => {
            alert('Payment failed. Please try again.');
            setIsLoading(false);
        });
        

    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h1>
          <Button 
            onClick={displayRazorpay}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default RazorpayPayment;