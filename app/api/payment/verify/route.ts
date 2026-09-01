import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import Registration from '@/models/Registration';
import Event from '@/models/Event';
import { sendRegistrationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = await req.json();

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }

    await connectDB();

    const registration = await Registration.findOne({ registrationId });
    if (!registration) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    registration.paymentStatus = 'completed';
    registration.paymentId = razorpay_payment_id;
    await registration.save();

    await Event.findByIdAndUpdate(registration.event, { $inc: { registeredCount: 1 } });

    const event = await Event.findById(registration.event);
    if (event) {
      await sendRegistrationEmail(registration.email, registration.name, event.title, registrationId);
    }

    return NextResponse.json({ success: true, message: 'Payment verified' });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
  }
}
