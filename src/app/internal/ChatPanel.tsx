'use client'

import { useState } from 'react'

type Props = {
  agentPath: string  // e.g. "body/herbalist"
  agentName: string  // e.g. "Herbalist"
  scope?: string     // optional one-liner from SKILL.md
}

export default function ChatPanel({ agentPath, agentName, scope }: Props) {
  const [input, setInput] = useState('')

  return (
    <aside className="w-96 shrink-0 border-l border-[#222] bg-[#050505] flex flex-col h-[calc(100vh-0px)] sticky top-0">
      {/* Header */}
      <div className="px-4 py-4 border-b border-[#222]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-klein" />
          <p className="text-[10px] uppercase tracking-wider text-[#666]">Agent</p>
        </div>
        <h2 className="text-base font-semibold text-white">{agentName}</h2>
        {scope && (
          <p className="text-xs text-[#888] mt-1 leading-relaxed">{scope}</p>
        )}
        <p className="text-[10px] text-[#555] mt-2 font-mono">brain/{agentPath}/</p>
      </div>

      {/* Message log — empty state */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="text-center mt-12">
          <div className="inline-block px-2 py-1 rounded-full bg-[#0a0a0a] border border-[#222] text-[10px] uppercase tracking-wider text-[#666] mb-4">
            Phase 4 — not yet wired
          </div>
          <p className="text-sm text-[#888] leading-relaxed max-w-xs mx-auto">
            Chat with the <span className="text-white">{agentName}</span> agent here. When wired, the agent loads <span className="font-mono text-[#aaa]">SKILL.md</span> + every file in <span className="font-mono text-[#aaa]">references/</span> as context, then streams Claude responses via Vercel AI SDK.
          </p>
          <p className="text-xs text-[#555] mt-4">
            See <a href="/internal/PLAN.md" className="text-klein hover:underline">PLAN.md</a> Phase 4 for the implementation plan.
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#222] p-3">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${agentName.toLowerCase()}…`}
            rows={2}
            className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#333] resize-none"
            disabled
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-[#444]">⌘↩ to send (when live)</p>
          <button
            disabled
            title="Not wired up yet — see Phase 4"
            className="text-xs px-3 py-1.5 rounded bg-[#1a1a1a] border border-[#222] text-[#666] cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </aside>
  )
}
