import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import LearningHubPost from '@/components/LearningHubPost'
import { locales } from '@/i18n'

export default async function LearningHubPostPage({
  params,
}: {
  params: { id: string }
}) {
  unstable_setRequestLocale(locales[0])

  const messages = await (
    await import(`@/../messages/translations.${locales[0]}.json`)
  ).default

  return (
    <NextIntlClientProvider locale={locales[0]} messages={messages}>
      <LearningHubPost params={params} />
    </NextIntlClientProvider>
  )
}
