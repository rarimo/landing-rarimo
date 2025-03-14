import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export const locales = ['en']

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale

  if (!locale || !locales.includes(locale)) {
    notFound()
  }

  return {
    locale,
    messages: (await import(`../../messages/translations.${locale}.json`))
      .default,
  }
})
