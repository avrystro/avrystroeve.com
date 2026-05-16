import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_COOKIE = 'avry_admin_auth'

function getExpectedSecret() {
  return process.env.ADMIN_PASSWORD ?? ''
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    return NextResponse.next()
  }

  const cookie = req.cookies.get(AUTH_COOKIE)?.value
  const expected = getExpectedSecret()

  if (!expected) {
    return new NextResponse(
      'Server misconfigured: ADMIN_PASSWORD not set. Set it in .env.local before using gated routes.',
      { status: 500 },
    )
  }

  if (cookie === expected) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const url = req.nextUrl.clone()
  url.pathname = '/admin/login'
  url.searchParams.set('next', pathname + req.nextUrl.search)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/internal/:path*',
    '/api/admin/:path*',
    '/api/brain-tree',
    '/api/brain/:path*',
    '/api/file/:path*',
    '/api/canvas/:path*',
    '/api/agent/:path*',
  ],
}
