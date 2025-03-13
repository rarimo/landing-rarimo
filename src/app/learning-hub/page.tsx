import { GoogleAnalytics } from '@next/third-parties/google'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import LearningHub from '@/components/LearningHub'
import { config } from '@/config'
import { locales } from '@/i18n/request'

export default async function LearningHubPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  setRequestLocale(locales[0])

  const messages = await (
    await import(`@/../messages/translations.${locales[0]}.json`)
  ).default

  return (
    <NextIntlClientProvider locale={locales[0]} messages={messages}>
      <LearningHub searchParams={searchParams} />
      <GoogleAnalytics gaId={config.gaIdHub} />
    </NextIntlClientProvider>
  )
}
