'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import '@excalidraw/excalidraw/index.css'
import type {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from '@excalidraw/excalidraw/types'

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  { ssr: false },
)

type DirEntry = {
  name: string
  type: 'dir' | 'file'
  ext: string
  size?: number
  modified_iso?: string
}

type ExcalidrawDoc = {
  type?: string
  version?: number
  elements?: unknown[]
  appState?: Record<string, unknown>
  files?: Record<string, unknown>
}

type FilePayload =
  | { kind: 'directory'; path: string; modified_iso: string; children: DirEntry[] }
  | { kind: 'markdown'; path: string; bytes: number; modified_iso: string; frontmatter: unknown | null; body: string }
  | { kind: 'excalidraw'; path: string; bytes: number; modified_iso: string; doc: ExcalidrawDoc }
  | { kind: 'json'; path: string; bytes: number; modified_iso: string; raw: string }
  | { kind: 'binary'; path: string; ext: string; bytes: number; modified_iso: string }
  | { error: string }

/**
 * Whitelist of appState fields that genuinely belong to the canvas as a
 * DOCUMENT (vs ephemeral viewer state like zoom / scroll / selection / current
 * tool color). Only these are persisted on save. Everything else (including
 * `collaborators` Map that crashes JSON.stringify) is dropped, keeping the
 * on-disk file lean and avoiding the runtime-Map deserialization bug.
 */
const PERSIST_APPSTATE_KEYS = [
  'viewBackgroundColor',
  'gridModeEnabled',
  'gridSize',
  'theme',
] as const

function extractPersistableAppState(
  appState: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!appState) return {}
  const out: Record<string, unknown> = {}
  for (const k of PERSIST_APPSTATE_KEYS) {
    if (k in appState) out[k] = (appState as Record<string, unknown>)[k]
  }
  return out
}

function Breadcrumb({ segments }: { segments: string[] }) {
  const crumbs: { label: string; href: string }[] = []
  segments.forEach((seg, i) => {
    const href = '/internal/' + segments.slice(0, i + 1).join('/')
    crumbs.push({ label: seg, href })
  })
  return (
    <nav className="flex items-center gap-1.5 text-xs font-mono text-[#888] flex-wrap">
      <Link href="/internal" className="hover:text-white">brain</Link>
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-1.5">
          <span className="text-[#444]">/</span>
          {i === crumbs.length - 1 ? (
            <span className="text-white">{c.label}</span>
          ) : (
            <Link href={c.href} className="hover:text-white">{c.label}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}

function NewCanvasButton({ dirPath }: { dirPath: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function create() {
    const raw = prompt('New canvas name (no extension):', 'untitled-canvas')
    if (!raw) return
    const slug = raw
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '')
    if (!slug) {
      setErr('Invalid name.')
      return
    }
    const filename = `${slug}.excalidraw`
    const canvasPath = dirPath ? `${dirPath}/${filename}` : filename
    setBusy(true)
    setErr(null)
    try {
      const res = await fetch(`/api/canvas/${canvasPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'excalidraw',
          version: 2,
          source: 'avrystroeve.com-internal',
          elements: [],
          appState: { viewBackgroundColor: '#ffffff', gridSize: 20 },
          files: {},
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || `HTTP ${res.status}`)
      }
      router.push(`/internal/${canvasPath}`)
    } catch (e) {
      setErr(String(e))
      setBusy(false)
    }
  }

  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={create}
        disabled={busy}
        className="text-xs px-3 py-1.5 rounded border border-klein/30 text-klein hover:bg-klein/10 disabled:opacity-50 transition-colors"
      >
        {busy ? 'Creating…' : '+ New canvas'}
      </button>
      {err && <span className="text-xs text-[#ff8a8a]">{err}</span>}
    </div>
  )
}

function DirectoryView({ payload, basePath, dirPath }: { payload: Extract<FilePayload, { kind: 'directory' }>; basePath: string; dirPath: string }) {
  return (
    <div>
      <NewCanvasButton dirPath={dirPath} />
      <div className="border border-[#222] rounded-xl bg-[#0a0a0a] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#0a0a0a] border-b border-[#1a1a1a]">
            <tr className="text-[10px] uppercase tracking-wider text-[#666]">
              <th className="text-left px-4 py-2 font-normal">Name</th>
              <th className="text-left px-4 py-2 font-normal">Type</th>
              <th className="text-right px-4 py-2 font-normal">Modified</th>
            </tr>
          </thead>
          <tbody>
            {payload.children.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-[#666] text-sm">empty</td></tr>
            )}
            {payload.children.map((c) => {
              const href = `${basePath}/${c.name}`
              const label = c.type === 'dir' ? `${c.name}/` : c.name
              const typeLabel =
                c.type === 'dir' ? 'directory'
                : c.ext === 'excalidraw' ? 'canvas'
                : c.ext === 'md' || c.ext === 'mdx' ? 'markdown'
                : c.ext === 'm4a' || c.ext === 'mp3' || c.ext === 'wav' ? 'audio'
                : c.ext || 'file'
              return (
                <tr key={c.name} className="border-b border-[#1a1a1a] hover:bg-[#111]">
                  <td className="px-4 py-2.5">
                    <Link href={href} className="text-[#ddd] hover:text-white">
                      {label}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#888]">{typeLabel}</td>
                  <td className="px-4 py-2.5 text-xs text-[#666] text-right">
                    {c.modified_iso ? new Date(c.modified_iso).toLocaleString() : ''}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const proseClass =
  'prose prose-invert prose-sm max-w-none ' +
  'prose-headings:font-semibold prose-headings:text-white ' +
  'prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[#1a1a1a] ' +
  'prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 ' +
  'prose-h4:text-sm prose-h4:uppercase prose-h4:tracking-wider prose-h4:text-[#888] ' +
  'prose-p:text-[#ccc] prose-p:leading-relaxed ' +
  'prose-li:text-[#ccc] prose-li:my-0.5 ' +
  'prose-strong:text-white ' +
  'prose-code:text-klein prose-code:bg-[#0a0a0a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs prose-code:before:content-none prose-code:after:content-none ' +
  'prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-[#222] prose-pre:rounded-lg prose-pre:text-xs ' +
  'prose-table:text-xs prose-th:text-white prose-th:border-[#222] prose-td:border-[#222] ' +
  'prose-a:text-klein prose-a:no-underline hover:prose-a:underline ' +
  'prose-hr:border-[#222]'

function MarkdownView({ payload }: { payload: Extract<FilePayload, { kind: 'markdown' }> }) {
  return (
    <div className="max-w-4xl">
      {!!(payload.frontmatter && typeof payload.frontmatter === 'object' && Object.keys(payload.frontmatter as object).length > 0) && (
        <details className="mb-6 border border-[#222] rounded-lg bg-[#0a0a0a]">
          <summary className="cursor-pointer text-xs uppercase tracking-wider text-[#666] px-3 py-2 hover:text-white">
            frontmatter
          </summary>
          <pre className="text-xs text-[#aaa] px-4 py-3 border-t border-[#222] overflow-x-auto">
            {JSON.stringify(payload.frontmatter, null, 2)}
          </pre>
        </details>
      )}
      <article className={proseClass}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{payload.body}</ReactMarkdown>
      </article>
    </div>
  )
}

function CanvasView({ segments }: { segments: string[] }) {
  const pathStr = useMemo(() => segments.join('/'), [segments])
  const isScratch = pathStr === 'whiteboards/scratch.excalidraw'
  const router = useRouter()
  const apiRef = useRef<ExcalidrawImperativeAPI | null>(null)
  const lastServerSerialRef = useRef('')
  const lastSavedDocRef = useRef<unknown>(null)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [initial, setInitial] = useState<ExcalidrawInitialDataState | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [lastSync, setLastSync] = useState('—')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [savingAs, setSavingAs] = useState(false)

  async function saveAsNew() {
    if (!lastSavedDocRef.current) {
      alert('Nothing to save yet — draw something first.')
      return
    }
    const raw = prompt('Save scratch as new whiteboard. Name (no extension):', '')
    if (!raw) return
    const slug = raw.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '')
    if (!slug) {
      alert('Invalid name.')
      return
    }
    const newPath = `whiteboards/${slug}.excalidraw`
    setSavingAs(true)
    const res = await fetch(`/api/canvas/${newPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lastSavedDocRef.current),
    })
    setSavingAs(false)
    if (!res.ok) {
      alert('Save failed.')
      return
    }
    router.push(`/internal/${newPath}`)
  }

  async function loadDoc(): Promise<ExcalidrawDoc> {
    const res = await fetch(`/api/canvas/${pathStr}`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`GET /api/canvas/${pathStr} → ${res.status}`)
    return res.json()
  }

  useEffect(() => {
    let active = true
    loadDoc()
      .then((doc) => {
        if (!active) return
        lastServerSerialRef.current = JSON.stringify({
          elements: doc.elements ?? [],
          appState: extractPersistableAppState(doc.appState),
        })
        setInitial({
          elements: (doc.elements ?? []) as ExcalidrawInitialDataState['elements'],
          appState: extractPersistableAppState(doc.appState) as ExcalidrawInitialDataState['appState'],
          files: (doc.files ?? {}) as ExcalidrawInitialDataState['files'],
        })
        setStatus('ready')
        setLastSync(new Date().toLocaleTimeString())
      })
      .catch((e) => {
        if (!active) return
        setErrorMsg(String(e))
        setStatus('error')
      })
    return () => { active = false }
  }, [pathStr]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChange(
    elements: readonly unknown[],
    appState: Record<string, unknown>,
    files: Record<string, unknown>,
  ) {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(async () => {
      const cleaned = extractPersistableAppState(appState)
      const doc = {
        type: 'excalidraw',
        version: 2,
        source: 'avrystroeve.com-internal',
        elements: [...elements],
        appState: cleaned,
        files,
      }
      const serial = JSON.stringify({ elements: doc.elements, appState: cleaned })
      if (serial === lastServerSerialRef.current) return
      lastServerSerialRef.current = serial
      lastSavedDocRef.current = doc
      await fetch(`/api/canvas/${pathStr}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      })
      setLastSync(new Date().toLocaleTimeString())
    }, 500)
  }

  if (status === 'error') {
    return (
      <div className="p-8">
        <div className="bg-[#2a0606] border border-[#5a1818] rounded-lg p-4 text-sm text-[#ff8a8a]">{errorMsg}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between gap-4 text-xs font-mono text-[#888] border-b border-[#222] px-4 py-1.5">
        <div className="flex items-center gap-3">
          {isScratch && (
            <>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#8b5cf6]/15 text-[#8b5cf6] border border-[#8b5cf6]/30">scratch</span>
              <button
                onClick={saveAsNew}
                disabled={savingAs}
                className="text-xs px-2.5 py-1 rounded border border-klein/30 text-klein hover:bg-klein/10 disabled:opacity-50 transition-colors"
              >
                {savingAs ? 'Saving…' : 'Save as new whiteboard'}
              </button>
              <span className="text-[10px] text-[#555]">tip: hamburger menu → Reset canvas to clear</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>status: <span className={status === 'ready' ? 'text-klein' : 'text-[#ffd166]'}>{status}</span></span>
          <span>last sync: {lastSync}</span>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        {initial ? (
          <Excalidraw
            excalidrawAPI={(api) => { apiRef.current = api }}
            initialData={initial}
            onChange={(elements, appState, files) =>
              onChange(
                elements as unknown as readonly unknown[],
                appState as unknown as Record<string, unknown>,
                files as unknown as Record<string, unknown>,
              )
            }
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[#888] text-sm">Loading canvas…</div>
        )}
      </div>
    </div>
  )
}

export default function FileView({ segments }: { segments: string[] }) {
  const pathStr = segments.join('/')
  const last = segments[segments.length - 1] ?? ''
  const isCanvas = last.endsWith('.excalidraw')
  const [payload, setPayload] = useState<FilePayload | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    // Canvases skip the file API entirely — CanvasView handles loading directly
    // via /api/canvas (which create-on-read for missing files).
    if (isCanvas) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPayload(null)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErr(null)
    fetch(`/api/file/${pathStr}`, { cache: 'no-store' })
      .then(async (r) => {
        const j = await r.json()
        if (!r.ok) throw new Error(j?.error || `HTTP ${r.status}`)
        return j as FilePayload
      })
      .then(setPayload)
      .catch((e) => setErr(String(e)))
  }, [pathStr, isCanvas])

  // Canvas: full-bleed, no padding, takes all available vertical space.
  // Render immediately without waiting on file API (which 404s for missing scratch files).
  if (isCanvas) {
    return (
      <div className="flex flex-col h-screen">
        <div className="px-6 py-3 border-b border-[#222] bg-[#0a0a0a]">
          <Breadcrumb segments={segments} />
        </div>
        <div className="flex-1 min-h-0">
          <CanvasView segments={segments} />
        </div>
      </div>
    )
  }

  if (err) {
    return (
      <div className="p-8 max-w-2xl">
        <Breadcrumb segments={segments} />
        <div className="mt-6 bg-[#2a0606] border border-[#5a1818] rounded-lg p-4 text-sm text-[#ff8a8a]">{err}</div>
      </div>
    )
  }
  if (!payload) {
    return <div className="p-8 text-sm text-[#888]">loading {pathStr}…</div>
  }

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <Breadcrumb segments={segments} />
      </div>
      {'kind' in payload && payload.kind === 'directory' && (
        <DirectoryView payload={payload} basePath={`/internal/${pathStr}`} dirPath={pathStr} />
      )}
      {'kind' in payload && payload.kind === 'markdown' && <MarkdownView payload={payload} />}
      {'kind' in payload && payload.kind === 'excalidraw' && null /* handled above via isCanvas */}
      {'kind' in payload && payload.kind === 'json' && (
        <pre className="text-xs text-[#aaa] bg-[#0a0a0a] border border-[#222] rounded-lg p-4 overflow-x-auto">
          {payload.raw}
        </pre>
      )}
      {'kind' in payload && payload.kind === 'binary' && (
        <div className="border border-[#222] rounded-lg p-8 bg-[#0a0a0a] text-sm text-[#888]">
          <div className="text-xs uppercase tracking-wider text-[#666] mb-2">Binary file</div>
          <p>Type: {payload.ext || 'unknown'}</p>
          <p className="mt-1">Size: {Math.round(payload.bytes / 1024)} KB</p>
          <p className="mt-1">Modified: {new Date(payload.modified_iso).toLocaleString()}</p>
          <p className="mt-4 text-xs text-[#666]">Inline preview not yet supported. Open the file from disk for now.</p>
        </div>
      )}
    </div>
  )
}
