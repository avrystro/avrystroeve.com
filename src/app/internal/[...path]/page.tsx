import FileView from '../FileView'

export default async function BrainPathPage({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  const { path: segments } = await params
  return <FileView segments={segments} />
}
