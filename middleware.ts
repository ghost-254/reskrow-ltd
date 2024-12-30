
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const protectedPaths = [
    '/properties/create',
    '/properties/edit',
    '/buy',
    '/sell',
    '/rent',
    '/profile',
    '/saved-properties',
    '/my-listings',
  ];

  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const sessionCheck = await fetch(`${request.nextUrl.origin}/api/validate-session`, {
    headers: { cookie: request.headers.get('cookie') || '' },
  });

  if (sessionCheck.status !== 200) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
