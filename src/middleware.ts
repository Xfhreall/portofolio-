import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/cms')) {
    const isCmsEnabled = process.env.ENABLE_CMS === 'true'
    if (!isCmsEnabled && process.env.NODE_ENV === 'production') {
      return NextResponse.rewrite(new URL('/not-found', request.url))
    }
    if (!pathname.startsWith('/cms/login')) {
      const authCookie = request.cookies.get('cms-auth')
      if (!authCookie || authCookie.value !== 'authenticated') {
        const loginUrl = new URL('/cms/login', request.url)
        return NextResponse.redirect(loginUrl)
      }
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/cms/:path*']
}
