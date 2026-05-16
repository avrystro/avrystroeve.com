import { NextResponse } from 'next/server'

const AUTH_COOKIE = 'avry_admin_auth'
const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD ?? ''
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'Server misconfigured: ADMIN_PASSWORD not set.' },
      { status: 500 },
    )
  }

  let password = ''
  try {
    const body = await req.json()
    password = typeof body?.password === 'string' ? body.password : ''
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (password !== expected) {
    return NextResponse.json({ ok: false, error: 'Wrong password.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: AUTH_COOKIE,
    value: expected,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ONE_WEEK_SECONDS,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: AUTH_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return res
}
