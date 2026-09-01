import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/db';
import Registration from '@/models/Registration';
import Event from '@/models/Event';
import User from '@/models/User';
import rateLimit from '@/lib/rate-limit';
import { sendRegistrationEmail } from '@/lib/email';
import { RegistrationPayload } from '@/types';

const limiter = rateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 500 });

function generateRegId(): string {
  return 'SYM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.ip ?? 'anonymous';
    await limiter.check(5, ip);

    const session = await getServerSession();
    await connectDB();

    const body: any = await req.json();
    const { eventId, selectedEventIds, name, email, phone, college, rollNumber, department, year, paymentMethod, amount } = body;

    if (!name || !email || !phone || !college) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    let targetEventId = eventId;
    if (!targetEventId || targetEventId === 'all-events') {
      const anyEvent = await Event.findOne();
      targetEventId = anyEvent?._id;
    }

    let userId = null;
    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email });
      userId = user?._id ?? null;
    }

    const regAmount = amount ?? 150;

    const registration = await Registration.create({
      registrationId: generateRegId(),
      event: targetEventId,
      user: userId,
      name,
      email,
      phone,
      college,
      rollNumber,
      department,
      year,
      paymentMethod,
      amount: regAmount,
      paymentStatus: 'pending',
    });

    if (targetEventId) {
      await Event.findByIdAndUpdate(targetEventId, { $inc: { registeredCount: 1 } });
    }

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.registrationId,
        status: registration.paymentStatus,
        amount: regAmount,
      },
    }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Rate limit exceeded') {
      return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  }
}
