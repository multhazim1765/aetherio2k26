import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow admin login page and login/logout API routes freely
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/login') ||
    pathname.startsWith('/api/admin/logout')
  ) {
    return NextResponse.next();
  }

  // Protect all /admin routes with admin_session cookie check
  if (pathname.startsWith('/admin')) {
    const adminSession = req.cookies.get('admin_session')?.value;
    if (adminSession !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
