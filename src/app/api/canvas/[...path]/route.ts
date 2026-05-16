import { NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SEGMENT_RE = /^[a-z0-9_][a-z0-9._-]{0,127}$/i

function isSafeSegment(seg: string): boolean {
  if (!seg || seg === '..' || seg.includes('/') || seg.includes('\\')) return false
  return SEGMENT_RE.test(seg)
}

function canvasPathFromSegments(segments: string[]): string | null {
  if (!segments.length) return null
  for (const seg of segments) {
    if (!isSafeSegment(seg)) return null
  }
  const last = segments[segments.length - 1]
  if (!last.endsWith('.excalidraw')) return null
  const fullPath = path.join(process.cwd(), 'brain', ...segments)
  const brainRoot = path.join(process.cwd(), 'brain') + path.sep
  if (!fullPath.startsWith(brainRoot)) return null
  return fullPath
}

function emptyScene() {
  return {
    type: 'excalidraw',
    version: 2,
    source: 'avrystroeve.com-internal',
    elements: [] as unknown[],
    appState: { viewBackgroundColor: '#ffffff', gridSize: 20 },
    files: {} as Record<string, unknown>,
  }
}

export async function GET(_req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params
  const target = canvasPathFromSegments(segments)
  if (!target) {
    return NextResponse.json({ error: 'Invalid canvas path.' }, { status: 400 })
  }

  await fs.mkdir(path.dirname(target), { recursive: true })

  try {
    const buf = await fs.readFile(target, 'utf-8')
    const parsed = JSON.parse(buf || '{}')
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.elements)) {
      return NextResponse.json(emptyScene(), { status: 200 })
    }
    return NextResponse.json(parsed, { status: 200 })
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code
    if (code === 'ENOENT') {
      return NextResponse.json(emptyScene(), { status: 200 })
    }
    return NextResponse.json(
      { error: 'Failed to read canvas.', detail: String(err) },
      { status: 500 },
    )
  }
}

export async function POST(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params
  const target = canvasPathFromSegments(segments)
  if (!target) {
    return NextResponse.json({ error: 'Invalid canvas path.' }, { status: 400 })
  }

  await fs.mkdir(path.dirname(target), { recursive: true })

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }
  if (!payload || typeof payload !== 'object') {
    return NextResponse.json({ error: 'Body must be a JSON object.' }, { status: 400 })
  }

  const json = JSON.stringify(payload, null, 2)
  try {
    await fs.writeFile(target, json, 'utf-8')
    return NextResponse.json({ ok: true, bytes: json.length })
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to write canvas.', detail: String(err) },
      { status: 500 },
    )
  }
}
