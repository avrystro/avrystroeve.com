'use client'

import { useState, useEffect, type FormEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get('next') || '/internal'

  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Sign in - avrystroeve.com'
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const r = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!r.ok) {
        const body = (await r.json().catch(() => ({}))) as { error?: string }
        setError(body.error ?? 'Sign in failed.')
        setBusy(false)
        return
      }
      router.replace(next)
      router.refresh()
    } catch {
      setError('Network error. Try again.')
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-6 border border-gray-200 rounded-2xl p-8 bg-white"
      >
        <div className="space-y-2">
          <p className="swiss text-xs tracking-[0.25em] text-klein">
            avrystroeve.com
          </p>
          <h1 className="text-2xl font-700" style={{ fontFamily: 'var(--font-heading)' }}>
            Sign in
          </h1>
          <p className="text-sm text-gray-500 font-light">
            Internal access. Password required.
          </p>
        </div>

        <label className="block space-y-1.5">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-light">
            Password
          </span>
          <input
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm placeholder:text-gray-300 focus:outline-none focus:border-klein transition-colors"
            disabled={busy}
            required
          />
        </label>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !password}
          className="w-full text-white font-500 rounded-lg px-4 py-3 swiss text-xs tracking-[0.12em] disabled:opacity-50 transition-opacity"
          style={{ background: 'var(--color-klein)' }}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-xs text-gray-400 pt-2 border-t border-gray-100 font-light">
          Redirects to <code className="text-gray-600">{next}</code> after sign in.
        </p>
      </form>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <LoginForm />
    </Suspense>
  )
}
