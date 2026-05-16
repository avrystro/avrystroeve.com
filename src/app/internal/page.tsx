'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type FilePayload = {
  kind: string
  bytes: number
  modified_iso: string
  frontmatter: Record<string, unknown> | null
  body: string
}

function timeAgo(iso?: string): string {
  if (!iso) return '—'
  const sec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (sec < 60) return `${sec}s ago`
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`
  return `${Math.floor(sec / 86400)}d ago`
}

export default function InternalOverview() {
  const [project, setProject] = useState<FilePayload | null>(null)
  const [handoff, setHandoff] = useState<FilePayload | null>(null)
  const [log, setLog] = useState<FilePayload | null>(null)

  useEffect(() => {
    document.title = 'Internal · avrystroeve.com'
    fetch('/api/file/PROJECT.md').then((r) => r.json()).then(setProject).catch(() => {})
    fetch('/api/file/HANDOFF.md').then((r) => r.json()).then(setHandoff).catch(() => {})
    fetch('/api/file/LOG.md').then((r) => r.json()).then(setLog).catch(() => {})
  }, [])

  // First ## section of LOG = most recent entry
  const topLogEntry = (() => {
    if (!log?.body) return null
    const lines = log.body.split('\n')
    let started = false
    const out: string[] = []
    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (!started) started = true
        else break
      }
      if (started) out.push(line)
    }
    return out.join('\n').trim().split('\n').slice(0, 8).join('\n')
  })()

  const logEntryCount = (log?.body.match(/^## /gm) ?? []).length

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-white">avrystroeve.com</h1>
        <p className="text-sm text-[#888] mt-1">Personal brain + admin dashboard</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <Stat label="LOG entries" value={logEntryCount} />
        <Stat label="PROJECT.md" value={project ? `${Math.round(project.bytes / 1024)}k` : '—'} />
        <Stat label="HANDOFF.md" value={handoff ? `${Math.round(handoff.bytes / 1024)}k` : '—'} />
        <Stat label="Agents" value={8} />
      </div>

      <Section title="Agents">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <AgentCard href="/internal/god" name="God" subtitle="spiritual companion" />
          <AgentCard href="/internal/body/chef" name="Chef" subtitle="nutrition + cooking" />
          <AgentCard href="/internal/body/trainer" name="Trainer" subtitle="movement + recovery" />
          <AgentCard href="/internal/body/herbalist" name="Herbalist" subtitle="plant medicine" />
          <AgentCard href="/internal/homebase/farmer" name="Farmer" subtitle="growing + soil + lunar timing" />
          <AgentCard href="/internal/family/wife" name="Wife" subtitle="relationship + game + profile" />
          <AgentCard href="/internal/service" name="Service" subtitle="consulting + offers + clients" />
          <AgentCard href="/internal/finances" name="Finances" subtitle="money + runway" />
        </div>
      </Section>

      <Section title="Most recent log entry" link={{ href: '/internal/LOG.md', label: 'Full log →' }}>
        {topLogEntry ? (
          <pre className="text-xs text-[#aaa] whitespace-pre-wrap font-sans leading-relaxed">{topLogEntry}…</pre>
        ) : (
          <div className="text-sm text-[#666]">no recent entries</div>
        )}
      </Section>

      <Section title="Project docs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DocLink href="/internal/PROJECT.md" label="PROJECT.md" sub={project ? `${Math.round(project.bytes / 1024)} KB · ${timeAgo(project.modified_iso)}` : ''} />
          <DocLink href="/internal/HANDOFF.md" label="HANDOFF.md" sub={handoff ? `${Math.round(handoff.bytes / 1024)} KB · ${timeAgo(handoff.modified_iso)}` : ''} />
          <DocLink href="/internal/LOG.md" label="LOG.md" sub={log ? `${Math.round(log.bytes / 1024)} KB · ${timeAgo(log.modified_iso)}` : ''} />
          <DocLink href="/internal/PLAN.md" label="PLAN.md" sub="admin-dashboard build plan" />
        </div>
      </Section>

      <Section title="Jump to">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <Link href="/internal/sources" className="border border-[#222] rounded-lg p-3 hover:bg-[#111] hover:border-[#333]">
            <div className="text-white">Sources</div>
            <div className="text-xs text-[#666] mt-1">voice memos, calls, raw inputs</div>
          </Link>
          <Link href="/internal/whiteboards" className="border border-[#222] rounded-lg p-3 hover:bg-[#111] hover:border-[#333]">
            <div className="text-white">Whiteboards</div>
            <div className="text-xs text-[#666] mt-1">free-form excalidraw (Phase 3)</div>
          </Link>
          <Link href="/internal/god" className="border border-[#222] rounded-lg p-3 hover:bg-[#111] hover:border-[#333]">
            <div className="text-white">God</div>
            <div className="text-xs text-[#666] mt-1">spiritual companion</div>
          </Link>
          <Link href="/internal/finances" className="border border-[#222] rounded-lg p-3 hover:bg-[#111] hover:border-[#333]">
            <div className="text-white">Finances</div>
            <div className="text-xs text-[#666] mt-1">money agent</div>
          </Link>
        </div>
      </Section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-[#222] rounded-lg p-3 bg-[#0a0a0a]">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[#666] mt-1">{label}</div>
    </div>
  )
}

function Section({ title, link, children }: { title: string; link?: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">{title}</h2>
        {link && (
          <Link href={link.href} className="text-xs text-[#888] hover:text-white">
            {link.label}
          </Link>
        )}
      </div>
      <div className="border border-[#222] rounded-xl bg-[#0a0a0a] p-4">{children}</div>
    </section>
  )
}

function DocLink({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <Link href={href} className="block py-2 px-3 rounded hover:bg-[#111]">
      <div className="text-sm text-[#ddd] font-mono">{label}</div>
      {sub && <div className="text-xs text-[#666] mt-0.5">{sub}</div>}
    </Link>
  )
}

function AgentCard({ href, name, subtitle }: { href: string; name: string; subtitle: string }) {
  return (
    <Link href={href} className="border border-[#222] rounded-lg p-3 hover:bg-[#111] hover:border-[#333]">
      <div className="text-white">{name}</div>
      <div className="text-xs text-[#666] mt-1">{subtitle}</div>
    </Link>
  )
}
