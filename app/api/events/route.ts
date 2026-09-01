import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Event from '@/models/Event';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');

    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (active === 'true') query.isActive = true;

    const events = await Event.find(query).sort({ date: 1 });
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const event = await Event.create(body);
    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 500 });
  }
}
