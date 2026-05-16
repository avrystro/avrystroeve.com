import type { Metadata } from 'next'
import Sidebar from './Sidebar'

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: { default: 'Internal · avrystroeve.com', template: '%s · Internal · avrystroeve.com' },
}

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">{children}</div>
    </div>
  )
}
