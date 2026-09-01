import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/db';
import Event from '@/models/Event';
import Registration from '@/models/Registration';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const [totalEvents, totalRegistrations, totalRevenue, pendingPayments] = await Promise.all([
      Event.countDocuments(),
      Registration.countDocuments(),
      Registration.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Registration.countDocuments({ paymentStatus: 'pending' }),
    ]);

    return NextResponse.json({
      totalEvents,
      totalRegistrations,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingPayments,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
