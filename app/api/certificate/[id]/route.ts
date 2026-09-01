import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Registration from '@/models/Registration';

interface LeanRegistration {
  certificateIssued: boolean;
  paymentStatus: string;
  name: string;
  event: { title: string; date: string } | null;
  registrationId: string;
  registeredAt: Date;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const registration = await Registration.findOne({ registrationId: params.id })
      .populate('event', 'title date')
      .lean() as LeanRegistration | null;

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    if (!registration.certificateIssued || registration.paymentStatus !== 'completed') {
      return NextResponse.json({ error: 'Certificate not available' }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      certificate: {
        recipient: registration.name,
        event: registration.event?.title,
        date: registration.event?.date,
        regId: registration.registrationId,
        issuedAt: registration.registeredAt,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certificate' }, { status: 500 });
  }
}
