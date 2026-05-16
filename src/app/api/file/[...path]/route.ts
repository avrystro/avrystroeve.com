import { NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SEGMENT_RE = /^[a-z0-9_][a-z0-9._-]{0,127}$/i

function isSafeSegment(seg: string): boolean {
  if (!seg || seg === '..' || seg.includes('/') || seg.includes('\\')) return false
  return SEGMENT_RE.test(seg)
}

function resolveSafePath(segments: string[]): string | null {
  if (!segments.length) return null
  for (const seg of segments) if (!isSafeSegment(seg)) return null
  const brainRoot = path.join(process.cwd(), 'brain')
  const target = path.join(brainRoot, ...segments)
  if (!target.startsWith(brainRoot + path.sep) && target !== brainRoot) return null
  return target
}

export async function GET(_req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params
  const target = resolveSafePath(segments)
  if (!target) {
    return NextResponse.json({ error: 'Invalid file path.' }, { status: 400 })
  }

  let stat
  try {
    stat = await fs.stat(target)
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code
    if (code === 'ENOENT') return NextResponse.json({ error: 'Not found.' }, { status: 404 })
    return NextResponse.json({ error: 'Stat failed.', detail: String(err) }, { status: 500 })
  }

  if (stat.isDirectory()) {
    const entries = await fs.readdir(target, { withFileTypes: true })
    const children = await Promise.all(
      entries
        .filter((e) => !e.name.startsWith('.') && e.name !== 'node_modules')
        .map(async (e) => {
          const childAbs = path.join(target, e.name)
          let cstat
          try {
            cstat = await fs.stat(childAbs)
          } catch {
            return null
          }
          const ext = e.isFile() ? path.extname(e.name).slice(1).toLowerCase() : ''
          return {
            name: e.name,
            type: e.isDirectory() ? ('dir' as const) : ('file' as const),
            ext,
            size: e.isFile() ? cstat.size : undefined,
            modified_iso: cstat.mtime.toISOString(),
          }
        }),
    )
    const ordered = children.filter(Boolean).sort((a, b) => {
      if (!a || !b) return 0
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
      return a.name.localeCompare(b.name)
    })
    return NextResponse.json({
      kind: 'directory',
      path: segments.join('/'),
      modified_iso: stat.mtime.toISOString(),
      children: ordered,
    })
  }

  const ext = path.extname(target).slice(1).toLowerCase()
  if (ext === 'md' || ext === 'mdx' || ext === 'txt') {
    const raw = await fs.readFile(target, 'utf-8')
    const parsed = matter(raw)
    return NextResponse.json({
      kind: 'markdown',
      path: segments.join('/'),
      bytes: raw.length,
      modified_iso: stat.mtime.toISOString(),
      frontmatter: Object.keys(parsed.data).length > 0 ? parsed.data : null,
      body: parsed.content,
    })
  }
  if (ext === 'excalidraw') {
    const raw = await fs.readFile(target, 'utf-8')
    let doc
    try {
      doc = JSON.parse(raw || '{}')
    } catch {
      doc = null
    }
    return NextResponse.json({
      kind: 'excalidraw',
      path: segments.join('/'),
      bytes: raw.length,
      modified_iso: stat.mtime.toISOString(),
      doc,
    })
  }
  if (ext === 'json') {
    const raw = await fs.readFile(target, 'utf-8')
    return NextResponse.json({
      kind: 'json',
      path: segments.join('/'),
      bytes: raw.length,
      modified_iso: stat.mtime.toISOString(),
      raw,
    })
  }

  return NextResponse.json({
    kind: 'binary',
    path: segments.join('/'),
    ext,
    bytes: stat.size,
    modified_iso: stat.mtime.toISOString(),
  })
}
