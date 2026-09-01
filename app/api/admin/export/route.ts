import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/db';
import Registration from '@/models/Registration';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const registrations = await Registration.find()
      .populate('event', 'title date venue')
      .sort({ registeredAt: -1 })
      .lean();

    const headers = [
      'Registration ID',
      'Name',
      'Email',
      'Phone',
      'College',
      'Roll Number',
      'Department',
      'Year',
      'Event',
      'Event Date',
      'Venue',
      'Amount',
      'Payment Status',
      'Payment Method',
      'Payment ID',
      'Registered At',
      'Attended',
      'Certificate Issued',
    ];

    const rows = registrations.map((reg: any) => [
      reg.registrationId,
      `"${reg.name}"`,
      reg.email,
      reg.phone,
      `"${reg.college}"`,
      reg.rollNumber || '',
      reg.department || '',
      reg.year || '',
      reg.event?.title || '',
      reg.event?.date ? new Date(reg.event.date).toISOString().split('T')[0] : '',
      reg.event?.venue || '',
      reg.amount,
      reg.paymentStatus,
      reg.paymentMethod || '',
      reg.paymentId || '',
      new Date(reg.registeredAt).toISOString(),
      reg.isAttended ? 'Yes' : 'No',
      reg.certificateIssued ? 'Yes' : 'No',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row: (string | number | boolean)[]) => row.join(',')),
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="symposium-registrations.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
