import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import LearningHub from '@/components/LearningHub'
import { locales } from '@/i18n'

export default async function LearningHubPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  unstable_setRequestLocale(locales[0])

  const messages = await (
    await import(`@/../messages/translations.${locales[0]}.json`)
  ).default

  return (
    <NextIntlClientProvider locale={locales[0]} messages={messages}>
      <LearningHub searchParams={searchParams} />
    </NextIntlClientProvider>
  )
}
