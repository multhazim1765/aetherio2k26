'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface UPIQRProps {
  amount: number;
  registrationId: string;
}

export default function UPIQR({ amount, registrationId }: UPIQRProps) {
  const [qrBase64, setQrBase64] = useState<string>('');
  const [upiLink, setUpiLink] = useState<string>('');
  const [upiId, setUpiId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        const res = await fetch('/api/payment/upi-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            registrationId,
            note: `Symposium Reg ${registrationId}`,
          }),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error);

        setQrBase64(data.qrBase64);
        setUpiLink(data.upiLink);
        setUpiId(data.upiId);
      } catch {
        setError('Failed to generate QR code');
      } finally {
        setLoading(false);
      }
    };

    generateQR();
  }, [amount, registrationId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#4f46e5]" />
      </div>
    );
  }

  if (error) {
    return <p className="text-[#ef4444] text-center text-sm">{error}</p>;
  }

  return (
    <div className="text-center space-y-4">
      <h3 className="font-semibold text-[#d1d5db]">Scan & Pay via Any UPI App</h3>
      {qrBase64 && (
        <img
          src={qrBase64}
          alt="UPI QR Code"
          className="w-48 h-48 mx-auto border border-[#1e1e2e] rounded-xl"
        />
      )}
      <p className="text-sm text-[#9ca3af] font-mono">UPI ID: {upiId}</p>
      <a
        href={upiLink}
        className="inline-block bg-[#10b981] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#059669] transition"
      >
        Open in GPay / PhonePe
      </a>
    </div>
  );
}
