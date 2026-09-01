import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import Registration from '@/models/Registration';
import Event from '@/models/Event';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (signature !== expected) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === 'payment.captured') {
      await connectDB();
      const orderId = event.payload.payment.entity.order_id;
      const paymentId = event.payload.payment.entity.id;

      const registration = await Registration.findOneAndUpdate(
        { orderId },
        { paymentStatus: 'completed', paymentId },
        { new: true }
      );

      if (registration) {
        await Event.findByIdAndUpdate(registration.event, { $inc: { registeredCount: 1 } });
      }
    }

    if (event.event === 'payment.failed') {
      await connectDB();
      const orderId = event.payload.payment.entity.order_id;
      await Registration.findOneAndUpdate(
        { orderId },
        { paymentStatus: 'failed' }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
