'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type DirEntry = {
  name: string
  type: 'dir' | 'file'
  ext: string
  size?: number
  modified_iso?: string
}

type FilePayload =
  | { kind: 'directory'; path: string; modified_iso: string; children: DirEntry[] }
  | { kind: 'markdown'; path: string; bytes: number; modified_iso: string; frontmatter: unknown | null; body: string }
  | { kind: 'excalidraw'; path: string; bytes: number; modified_iso: string; doc: unknown }
  | { kind: 'json'; path: string; bytes: number; modified_iso: string; raw: string }
  | { kind: 'binary'; path: string; ext: string; bytes: number; modified_iso: string }
  | { error: string }

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

function DirectoryView({ payload, basePath }: { payload: Extract<FilePayload, { kind: 'directory' }>; basePath: string }) {
  return (
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

export default function FileView({ segments }: { segments: string[] }) {
  const pathStr = segments.join('/')
  const [payload, setPayload] = useState<FilePayload | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    setPayload(null)
    setErr(null)
    fetch(`/api/file/${pathStr}`, { cache: 'no-store' })
      .then(async (r) => {
        const j = await r.json()
        if (!r.ok) throw new Error(j?.error || `HTTP ${r.status}`)
        return j as FilePayload
      })
      .then(setPayload)
      .catch((e) => setErr(String(e)))
  }, [pathStr])

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
        <DirectoryView payload={payload} basePath={`/internal/${pathStr}`} />
      )}
      {'kind' in payload && payload.kind === 'markdown' && <MarkdownView payload={payload} />}
      {'kind' in payload && payload.kind === 'excalidraw' && (
        <div className="border border-[#222] rounded-lg p-8 bg-[#0a0a0a] text-sm text-[#888]">
          <div className="text-xs uppercase tracking-wider text-[#666] mb-2">Excalidraw canvas</div>
          <p>Canvas rendering arrives in Phase 3 of the build plan.</p>
          <p className="mt-2 text-xs text-[#666]">{Math.round(payload.bytes / 1024)} KB · modified {new Date(payload.modified_iso).toLocaleString()}</p>
        </div>
      )}
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
