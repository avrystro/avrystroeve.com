import { NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Node = {
  name: string
  path: string
  type: 'dir' | 'file'
  ext?: string
  size?: number
  modified_iso?: string
  children?: Node[]
}

const IGNORE = new Set(['.DS_Store', '.git', 'node_modules', '.next'])

async function walk(absDir: string, relDir: string): Promise<Node[]> {
  let entries
  try {
    entries = await fs.readdir(absDir, { withFileTypes: true })
  } catch {
    return []
  }

  const nodes: Node[] = []
  for (const e of entries) {
    if (IGNORE.has(e.name)) continue
    if (e.name.startsWith('.')) continue

    const abs = path.join(absDir, e.name)
    const rel = relDir ? `${relDir}/${e.name}` : e.name

    if (e.isDirectory()) {
      const children = await walk(abs, rel)
      nodes.push({ name: e.name, path: rel, type: 'dir', children })
    } else if (e.isFile()) {
      let size = 0
      let mtime = ''
      try {
        const st = await fs.stat(abs)
        size = st.size
        mtime = st.mtime.toISOString()
      } catch {}
      const ext = path.extname(e.name).slice(1).toLowerCase()
      nodes.push({ name: e.name, path: rel, type: 'file', ext, size, modified_iso: mtime })
    }
  }

  nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  return nodes
}

export async function GET() {
  const brainRoot = path.join(process.cwd(), 'brain')
  try {
    const children = await walk(brainRoot, '')
    return NextResponse.json({ root: 'brain', children })
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to read brain tree.', detail: String(err) },
      { status: 500 },
    )
  }
}
