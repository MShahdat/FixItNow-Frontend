import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { createAccessToken } from './services/createAccessToken'

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = ['/', '/services', '/technicians', '/about', '/contact']


export async function proxy(request: NextRequest) {
  console.log('request', request)
  const pathname = request.nextUrl.pathname

  const cookieStore = await cookies()
  let accessToken = cookieStore.get('accessToken')?.value

  const decodeUser = accessToken ? jwt.decode(accessToken) as JwtPayload : null


  let role = null
  if (decodeUser) {
    role = decodeUser.role
  }

  //& logged in user can't access login and register page
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (role === 'CUSTOMER') {
      return NextResponse.redirect(new URL('/dashboard/customer', request.url))
    }
    else if (role === 'TECHNICIAN') {
      return NextResponse.redirect(new URL('/dashboard/technician', request.url))
    }
    else if (role === 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url))
    }
    else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }


  const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
  const isAuth = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))

  //& authenticated page protection 
  if (!accessToken && !isPublic && !isAuth) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }


  //& authorization 
  if (pathname.startsWith('/dashboard/customer') && role !== 'CUSTOMER') {
    return NextResponse.redirect(new URL('/not-found', request.url))
  }
  else if (pathname.startsWith('/dashboard/technician') && role !== 'TECHNICIAN') {
    return NextResponse.redirect(new URL('/not-found', request.url))
  }
  else if (pathname.startsWith('/dashboard/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/not-found', request.url))
  }



  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ]
}