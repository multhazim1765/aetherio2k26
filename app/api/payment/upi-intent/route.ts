import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 500 });

export async function POST(req: NextRequest) {
  try {
    const ip = req.ip ?? 'anonymous';
    await limiter.check(10, ip);

    const { amount, registrationId, note } = await req.json();

    if (!amount || !registrationId) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    const upiId = process.env.UPI_ID;
    const upiName = process.env.UPI_NAME;

    if (!upiId || !upiName) {
      return NextResponse.json({ success: false, error: 'UPI not configured' }, { status: 500 });
    }

    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note || registrationId)}&tr=${registrationId}`;

    const qrBase64 = await QRCode.toDataURL(upiLink, {
      width: 400,
      margin: 2,
      color: { dark: '#4f46e5', light: '#ffffff' },
    });

    return NextResponse.json({
      success: true,
      upiLink,
      qrBase64,
      upiId,
      amount,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Rate limit exceeded') {
      return NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 });
    }
    return NextResponse.json({ success: false, error: 'Failed to generate UPI QR' }, { status: 500 });
  }
}
