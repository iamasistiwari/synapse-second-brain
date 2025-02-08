import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
    if (!token) return false;
    const { payload } = await jwtVerify(token, secret);
    return !!payload?.id;
  } catch (error) {
    return false;
  }
}

export default withAuth(
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get('next-auth.session-token')?.value;
    const isAuth = await verifyToken(token || '');
    const isLoginPage = pathname.startsWith('/login');

    const sensitiveRoutes = [
      '/dashboard',
      '/links',
      '/note',
      '/tweets',
      '/tags',
      '/addcontent',
      '/content',
      '/content/:path*',
    ];
    const isAccessingSensitiveRoutes = sensitiveRoutes.some((route) => {
      return pathname.startsWith(route);
    });

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return NextResponse.next();
    }
    if (!isAuth && isAccessingSensitiveRoutes) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (isAuth && pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/:path*',
    '/login',
    '/dashboard/:path*',
    '/addcontent',
    '/content/:path*',
    '/content',
    '/links',
    '/note',
    '/tweets',
    '/tags',
  ],
};
