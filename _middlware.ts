import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest)
{
  const url = req.nextUrl.clone();

  if(url.pathname.startsWith('/demo'))
  {
    url.hostname = 'quick-edit-demo.vercel.app/admin#/~';
    return NextResponse.rewrite(url)
  }

  return NextResponse.next();
}