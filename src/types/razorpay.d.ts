interface RazorpayOptions {
    key: string;
    amount: string;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    callback_url?: string;
    notes: {
        address: string;
    };
    theme: {
        color: string;
    };
    handler: (response: any) => void;
}

interface RazorpayInstance {
    open: () => void;
    close: () => void;
    on: (event: string, handler: (response: any) => void) => void;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

export { RazorpayOptions, RazorpayInstance }; 