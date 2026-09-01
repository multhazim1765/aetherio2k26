'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  registrationId: string;
  amount: number;
  onSuccess: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function PaymentButton({ registrationId, amount, onSuccess }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      toast.error('Payment library not loaded. Please refresh.');
      return;
    }

    setLoading(true);
    try {
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId, amount }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.error);

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Symposium 2026',
        description: `Registration #${registrationId}`,
        order_id: orderData.orderId,
        handler: async function (response: RazorpayResponse) {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              toast.success('Payment successful! Check your email for confirmation.');
              onSuccess();
            } else {
              toast.error('Payment verification failed. Contact support.');
            }
          } catch {
            toast.error('Verification error. Please contact support with your payment ID.');
          }
        },
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#4f46e5' },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-[#4f46e5] text-white py-3.5 rounded-lg font-semibold hover:bg-[#4338ca] disabled:opacity-50 transition flex items-center justify-center gap-2"
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {loading ? 'Processing...' : `Pay ₹${amount} via UPI / Card`}
    </button>
  );
}
