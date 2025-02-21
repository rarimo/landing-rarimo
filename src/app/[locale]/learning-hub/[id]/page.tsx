import LearningHubPost from '@/components/LearningHubPost'

export default async function LearningHubPostPage({
  params,
}: {
  params: { id: string }
}) {
  return <LearningHubPost params={params} />
}
