import { Metadata, ResolvingMetadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import LearningHubPost, {
  getPostId,
  LearningHubPostPageProps,
  resolvingPost,
} from '@/components/LearningHubPost'
import { config } from '@/config'
import { locales } from '@/i18n/request'

export async function generateMetadata(
  { params }: LearningHubPostPageProps,
  parent: ResolvingMetadata,
) {
  const t = await getTranslations({ locale: params.locale, namespace: '' })

  try {
    const post = await resolvingPost(params.id)

    return {
      metadataBase: new URL('https://rarimo.com/'),
      title: post.attributes.title,
      description: post.attributes.shortDescription,

      openGraph: {
        type: 'website',
        siteName: t('metadata.openGraph.siteName'),
        title: post.attributes.title,
        description: post.attributes.shortDescription,
        url: `${config.learningHubApiUrl}/posts/${getPostId(params.id)}`,
        images: post.attributes.coverImage,
      },

      twitter: {
        site: t('metadata.twitter.site'),
        title: post.attributes.title,
        description: post.attributes.shortDescription,
        images: post.attributes.coverImage,
      },
    }
  } catch (error) {
    return (await parent) as Metadata
  }
}

export default async function LearningHubPostPage({
  params,
}: LearningHubPostPageProps) {
  setRequestLocale(locales[0])

  const messages = await (
    await import(`@/../messages/translations.${locales[0]}.json`)
  ).default

  return (
    <NextIntlClientProvider locale={locales[0]} messages={messages}>
      <LearningHubPost params={params} />
    </NextIntlClientProvider>
  )
}
