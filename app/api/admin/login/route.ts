import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const inputEmail = email ? email.trim().toLowerCase() : '';
    const inputPassword = password ? password.trim() : '';

    const validEmails = [
      'admin@aetherion.org',
      'admin@college.edu',
      process.env.ADMIN_EMAIL?.trim().toLowerCase(),
    ].filter(Boolean);

    const validPasswords = [
      'admin@123',
      'admin123',
      process.env.ADMIN_PASSWORD?.trim(),
    ].filter(Boolean);

    if (validEmails.includes(inputEmail) && validPasswords.includes(inputPassword)) {
      const response = NextResponse.json({ success: true, message: 'Authenticated' });
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
