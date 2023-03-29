// <root>/middleware.ts
import { getToken } from 'next-auth/jwt'
import { signOut } from 'next-auth/react'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!request.nextUrl.pathname.startsWith('/account')) {
    if (session?.state) {
      if (session.state == 7) {
        const url = request.nextUrl.clone()
        url.pathname = '/account/account_expired'
        url.searchParams.set('state', String(session.state))
        return NextResponse.redirect(url)
      } else if (session.state == 8) {
        const url = request.nextUrl.clone()
        url.pathname = '/account/account_locked'
        url.searchParams.set('state', String(session.state))
        return NextResponse.redirect(url)
      } else if (session.state == 9) {
        const url = request.nextUrl.clone()
        url.pathname = '/account/account_withdraw'
        url.searchParams.set('state', String(session.state))
        return NextResponse.redirect(url)
      }
    } else {
    }
  } else {
    if (!session) {
      if (
        request.nextUrl.pathname.indexOf('reset_password') > -1 &&
        request.nextUrl.search.indexOf('callbackPage') < 0
      ) {
      } else {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.search = ''

        return NextResponse.redirect(url)
      }
    }
  }

  if (request.nextUrl.pathname.startsWith('/mypage')) {
    if (!session) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'

      return NextResponse.redirect(url)
    }
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    if (session) {
      const url = request.nextUrl.clone()
      url.pathname = '/'

      return NextResponse.redirect(url)
    }
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // This logic is only applied to /dashboard
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|lego.ico|main.svg).*)',
  ],
}
