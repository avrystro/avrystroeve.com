'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  agentPath: string  // e.g. "body/herbalist"
  agentName: string  // e.g. "Herbalist"
  scope?: string     // optional one-liner from SKILL.md
}

const proseSmall =
  'prose prose-invert prose-xs max-w-none ' +
  'prose-headings:font-semibold prose-headings:text-white prose-headings:text-sm prose-headings:mt-2 prose-headings:mb-1 ' +
  'prose-p:text-[#ddd] prose-p:leading-relaxed prose-p:my-1 ' +
  'prose-li:text-[#ddd] prose-li:my-0 ' +
  'prose-strong:text-white ' +
  'prose-code:text-klein prose-code:bg-[#0a0a0a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-[10px] prose-code:before:content-none prose-code:after:content-none ' +
  'prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-[#222] prose-pre:rounded prose-pre:text-[10px] prose-pre:my-1 ' +
  'prose-a:text-klein prose-a:no-underline hover:prose-a:underline'

function messageText(msg: { parts?: Array<{ type: string; text?: string }>; content?: string }): string {
  if (msg.parts && Array.isArray(msg.parts)) {
    return msg.parts
      .filter((p) => p.type === 'text' && typeof p.text === 'string')
      .map((p) => p.text)
      .join('')
  }
  return typeof msg.content === 'string' ? msg.content : ''
}

export default function ChatPanel({ agentPath, agentName, scope }: Props) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/agent/chat',
      body: { agentPath },
    }),
  })

  const busy = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  function submit(e?: React.FormEvent | React.KeyboardEvent) {
    e?.preventDefault?.()
    const text = input.trim()
    if (!text || busy) return
    sendMessage({ text })
    setInput('')
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') submit(e)
  }

  return (
    <aside className="w-96 shrink-0 border-l border-[#222] bg-[#050505] flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="px-4 py-4 border-b border-[#222]">
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-1.5 h-1.5 rounded-full ${busy ? 'bg-[#ffd166] animate-pulse' : 'bg-klein'}`} />
          <p className="text-[10px] uppercase tracking-wider text-[#666]">
            Agent {busy ? '· thinking…' : ''}
          </p>
        </div>
        <h2 className="text-base font-semibold text-white">{agentName}</h2>
        {scope && (
          <p className="text-xs text-[#888] mt-1 leading-relaxed">{scope}</p>
        )}
        <p className="text-[10px] text-[#555] mt-2 font-mono">brain/{agentPath}/</p>
      </div>

      {/* Message log */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && !busy && (
          <div className="text-center mt-8">
            <p className="text-xs text-[#666] leading-relaxed max-w-xs mx-auto">
              No messages yet. Ask <span className="text-white">{agentName.toLowerCase()}</span> anything — they have access to <span className="font-mono text-[#aaa]">SKILL.md</span> and every file in <span className="font-mono text-[#aaa]">references/</span>.
            </p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : ''}>
            <div className="text-[10px] uppercase tracking-wider text-[#555] mb-1">
              {m.role === 'user' ? 'you' : agentName.toLowerCase()}
            </div>
            <div
              className={`inline-block text-left max-w-full text-sm leading-relaxed rounded-lg px-3 py-2 ${
                m.role === 'user'
                  ? 'bg-klein/10 border border-klein/30 text-white'
                  : 'bg-[#0a0a0a] border border-[#222] text-[#ddd]'
              }`}
            >
              {m.role === 'assistant' ? (
                <article className={proseSmall}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{messageText(m)}</ReactMarkdown>
                </article>
              ) : (
                <span className="whitespace-pre-wrap">{messageText(m)}</span>
              )}
            </div>
          </div>
        ))}
        {error && (
          <div className="text-xs text-[#ff8a8a] bg-[#2a0606] border border-[#5a1818] rounded-lg px-3 py-2">
            {error.message ?? String(error)}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={submit} className="border-t border-[#222] p-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`Message ${agentName.toLowerCase()}…`}
          rows={2}
          className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#333] resize-none"
          disabled={busy}
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-[#444]">⌘↩ to send</p>
          <button
            type="submit"
            disabled={!input.trim() || busy}
            className="text-xs px-3 py-1.5 rounded bg-klein text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {busy ? '…' : 'Send'}
          </button>
        </div>
      </form>
    </aside>
  )
}
