import LearningHubPost, {
  LearningHubPostPageProps,
} from '@/components/LearningHubPost'

export { generateMetadata } from '@/app/learning-hub/[id]/page'

export default async function LearningHubPostPage({
  params,
}: LearningHubPostPageProps) {
  return <LearningHubPost params={params} />
}
