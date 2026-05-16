import FileView from '../FileView'
import ChatPanel from '../ChatPanel'
import { resolveAgent } from '../agents'

export default async function BrainPathPage({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  const { path: segments } = await params
  const agent = resolveAgent(segments)

  return (
    <div className="flex flex-1 min-h-screen">
      <div className="flex-1 min-w-0">
        <FileView segments={segments} />
      </div>
      {agent && (
        <ChatPanel
          agentPath={agent.path}
          agentName={agent.name}
          scope={agent.scope}
        />
      )}
    </div>
  )
}
