import '@/theme/styles.scss'

import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'

import AosInit from '@/common/AosInit'
import { locales } from '@/i18n'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: '' })

  return {
    metadataBase: new URL('https://rarimo.com/'),
    title: t('metadata.title'),
    description: t('metadata.description'),

    openGraph: {
      title: t('metadata.openGraph.description'),
      description: t('metadata.openGraph.description'),
      type: 'website',
      url: t('metadata.openGraph.url'),
      siteName: t('metadata.openGraph.siteName'),
      images: t('metadata.openGraph.images'),
    },

    twitter: {
      title: t('metadata.twitter.title'),
      description: t('metadata.twitter.description'),
      card: 'summary_large_image',
      images: t('metadata.twitter.images'),
      site: t('metadata.twitter.site'),
    },
  }
}

//function to get the translations
async function getMessages(locale: string) {
  try {
    return (await import(`@/../messages/translations.${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const messages = await getMessages(locale)

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AosInit />
      {children}
    </NextIntlClientProvider>
  )
}
