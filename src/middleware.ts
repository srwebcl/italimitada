import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith('/admin-panel') && path !== '/admin-panel/login') {
    const session = request.cookies.get('admin_session');
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin-panel/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);
      await jwtVerify(session.value, secret);
    } catch (e) {
      return NextResponse.redirect(new URL('/admin-panel/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin-panel/:path*',
};
