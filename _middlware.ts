import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/demo') {
    return NextResponse.rewrite(new URL('https://quick-edit-demo.vercel.app'));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/demo'],
};
