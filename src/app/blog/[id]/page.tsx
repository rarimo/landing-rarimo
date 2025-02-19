import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import Article from '@/components/Article'
import { locales } from '@/i18n'

export default async function ArticlePage({
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
      <Article params={params} />
    </NextIntlClientProvider>
  )
}
