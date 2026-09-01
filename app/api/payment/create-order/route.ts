import { NextRequest, NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import connectDB from '@/lib/db';
import Registration from '@/models/Registration';

export async function POST(req: NextRequest) {
  try {
    const { registrationId, amount } = await req.json();

    await connectDB();
    const registration = await Registration.findOne({ registrationId });
    if (!registration) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: registrationId,
      notes: {
        registrationId,
        event: registration.event.toString(),
      },
    });

    registration.orderId = order.id;
    await registration.save();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
