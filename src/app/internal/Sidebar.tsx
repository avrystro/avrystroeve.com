'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Node = {
  name: string
  path: string
  type: 'dir' | 'file'
  ext?: string
  size?: number
  modified_iso?: string
  children?: Node[]
}

type Tree = { root: string; children: Node[] }

// Top-level brain sections, ordered as they appear in the sidebar
const TOP_SECTIONS = ['god', 'body', 'finances', 'sources', 'whiteboards'] as const

// Pinned root-level brain docs (PROJECT.md, HANDOFF.md, LOG.md, PLAN.md)
const PINNED_DOCS = [
  { file: 'PROJECT.md', label: 'PROJECT.md' },
  { file: 'HANDOFF.md', label: 'HANDOFF.md' },
  { file: 'LOG.md', label: 'LOG.md' },
  { file: 'PLAN.md', label: 'PLAN.md' },
]

function FileIcon({ ext, type }: { ext?: string; type: 'dir' | 'file' }) {
  if (type === 'dir') {
    return <span className="text-[#666] mr-1.5 text-[10px]">▸</span>
  }
  if (ext === 'excalidraw') return <span className="text-[#8b5cf6] mr-1.5 text-[10px]">◧</span>
  if (ext === 'md' || ext === 'mdx') return <span className="text-[#888] mr-1.5 text-[10px]">≡</span>
  if (ext === 'png' || ext === 'jpg' || ext === 'webp' || ext === 'jpeg') return <span className="text-[#666] mr-1.5 text-[10px]">▢</span>
  if (ext === 'pdf') return <span className="text-[#666] mr-1.5 text-[10px]">▤</span>
  if (ext === 'm4a' || ext === 'mp3' || ext === 'wav') return <span className="text-[#666] mr-1.5 text-[10px]">♪</span>
  return <span className="text-[#666] mr-1.5 text-[10px]">·</span>
}

function urlFor(brainPath: string): string {
  return `/internal/${brainPath}`
}

function TreeNode({
  node,
  depth,
  expandedPaths,
  toggle,
  activePath,
}: {
  node: Node
  depth: number
  expandedPaths: Set<string>
  toggle: (p: string) => void
  activePath: string
}) {
  const isExpanded = expandedPaths.has(node.path)
  const isActive = activePath === node.path
  const indent = { paddingLeft: `${depth * 12 + 12}px` }

  if (node.type === 'dir') {
    return (
      <li>
        <button
          onClick={() => toggle(node.path)}
          className={`w-full text-left text-[13px] flex items-center py-1 hover:bg-[#111] ${
            isActive ? 'text-white bg-[#111]' : 'text-[#aaa]'
          }`}
          style={indent}
        >
          <span className={`text-[10px] mr-1.5 text-[#666] transition-transform ${isExpanded ? 'rotate-90' : ''}`}>▸</span>
          <span>{node.name}/</span>
        </button>
        {isExpanded && node.children && node.children.length > 0 && (
          <ul>
            {node.children.map((c) => (
              <TreeNode
                key={c.path}
                node={c}
                depth={depth + 1}
                expandedPaths={expandedPaths}
                toggle={toggle}
                activePath={activePath}
              />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li>
      <Link
        href={urlFor(node.path)}
        className={`text-[13px] flex items-center py-1 hover:bg-[#111] ${
          isActive ? 'text-white bg-[#111] border-l-2 border-klein' : 'text-[#aaa]'
        }`}
        style={indent}
      >
        <FileIcon ext={node.ext} type="file" />
        <span className="truncate">{node.name}</span>
      </Link>
    </li>
  )
}

export default function Sidebar() {
  const pathname = usePathname() ?? ''
  const [tree, setTree] = useState<Tree | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['body', 'sources']))

  useEffect(() => {
    fetch('/api/brain-tree', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => setTree(data))
      .catch((e) => setErr(String(e)))
  }, [])

  // Auto-expand ancestors of the current page
  useEffect(() => {
    if (!pathname.startsWith('/internal/')) return
    const rest = pathname.replace(/^\/internal\//, '')
    const parts = rest.split('/')
    if (parts.length < 2) return
    const ancestors = parts.slice(0, -1).reduce<string[]>((acc, seg, i) => {
      const prev = i === 0 ? '' : `${acc[i - 1]}/`
      acc.push(prev + seg)
      return acc
    }, [])
    setExpanded((curr) => {
      const next = new Set(curr)
      ancestors.forEach((a) => next.add(a))
      return next
    })
  }, [pathname])

  function toggle(p: string) {
    setExpanded((curr) => {
      const next = new Set(curr)
      if (next.has(p)) next.delete(p)
      else next.add(p)
      return next
    })
  }

  const sectioned = useMemo(() => {
    if (!tree) return null
    const map: Record<string, Node> = {}
    for (const c of tree.children) map[c.name] = c
    return map
  }, [tree])

  const activePath = pathname.replace(/^\/internal\//, '')

  return (
    <aside className="w-72 shrink-0 border-r border-[#222] bg-[#050505] overflow-y-auto h-screen sticky top-0 text-white flex flex-col">
      <div className="px-4 py-4 border-b border-[#222]">
        <Link href="/internal" className="block">
          <h1 className="text-sm font-semibold text-white">avrystroeve.com</h1>
          <p className="text-[10px] text-[#666] mt-0.5 uppercase tracking-wider">Internal · Brain</p>
        </Link>
      </div>

      {/* Pinned brain docs */}
      <nav className="py-2 border-b border-[#222]">
        <div className="px-4 text-[10px] uppercase tracking-wider text-[#666] py-1.5">Project</div>
        <ul>
          {PINNED_DOCS.map((d) => {
            const href = `/internal/${d.file}`
            const isActive = pathname === href
            return (
              <li key={d.file}>
                <Link
                  href={href}
                  className={`text-[13px] flex items-center py-1.5 px-4 hover:bg-[#111] ${
                    isActive ? 'text-white bg-[#111] border-l-2 border-klein' : 'text-[#aaa]'
                  }`}
                >
                  <span className="text-[#888] mr-1.5 text-[10px]">≡</span>
                  {d.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Brain tree by section */}
      <nav className="py-2 flex-1">
        {err && <div className="px-4 py-3 text-xs text-[#ff8a8a]">{err}</div>}
        {!tree && !err && <div className="px-4 py-3 text-xs text-[#666]">loading…</div>}
        {sectioned &&
          TOP_SECTIONS.map((sec) => {
            const node = sectioned[sec]
            if (!node) return null
            return (
              <div key={sec} className="mb-2">
                <Link
                  href={`/internal/${sec}`}
                  className="block px-4 text-[10px] uppercase tracking-wider text-[#666] py-1.5 hover:text-white"
                >
                  {sec}
                </Link>
                <ul>
                  {node.children?.map((c) => (
                    <TreeNode
                      key={c.path}
                      node={c}
                      depth={0}
                      expandedPaths={expanded}
                      toggle={toggle}
                      activePath={activePath}
                    />
                  )) ?? null}
                </ul>
              </div>
            )
          })}
      </nav>

      {/* Bottom: sign out */}
      <div className="mt-auto border-t border-[#222] py-3 px-4 text-xs">
        <Link href="/" className="block text-[#888] hover:text-white py-1">
          ← Public site
        </Link>
        <button
          onClick={async () => {
            await fetch('/api/admin/auth', { method: 'DELETE' })
            window.location.href = '/admin/login'
          }}
          className="block text-[#888] hover:text-[#ff5a5a] py-1"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
