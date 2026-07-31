import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { createAccessToken } from './services/createAccessToken'
import { jwtToken } from './util/jwt'

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = ['/', '/services', '/technicians', '/about', '/contact']


export async function proxy(request: NextRequest) {
  // console.log('request', request)
  const pathname = request.nextUrl.pathname

  const cookieStore = await cookies()

  let accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value


  let decodeUser = accessToken ? jwtToken.jwtVerify(accessToken, process.env.JWT_ACCESS_SECRET as string) : null
  const decodeRefreshToken = refreshToken ? jwtToken.jwtVerify(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null


  if (!accessToken && decodeRefreshToken) {
    const result = await createAccessToken()

    if (result.success) {
      const newAccessToken = result.data.accessToken as string;
      cookieStore.set("accessToken", newAccessToken, {
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        httpOnly: true,
        sameSite: "lax",
      });

      accessToken = newAccessToken
      decodeUser = accessToken ? jwtToken.jwtVerify(accessToken, process.env.JWT_ACCESS_SECRET as string) : null
    }
  }

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