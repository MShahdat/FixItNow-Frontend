import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function proxy(request: NextRequest) {
  // console.log('request', request.nextUrl)
  const pathname = request.nextUrl.pathname
  console.log('pathname', pathname)

  // return NextResponse.redirect(new URL('/', request.url))
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ]
}