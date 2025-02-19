import Article from '@/components/Article'

export default async function ArticlePage({
  params,
}: {
  params: { id: string }
}) {
  return <Article params={params} />
}
