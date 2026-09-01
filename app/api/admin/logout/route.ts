import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return response;
}

export async function GET() {
  const response = NextResponse.redirect(new URL('/admin/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return response;
}
