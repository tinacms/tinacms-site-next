import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/demo')) {
    
    url.protocol = 'https';
    url.hostname = 'quick-edit-demo.vercel.app';

    
    url.pathname = '/admin';

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
