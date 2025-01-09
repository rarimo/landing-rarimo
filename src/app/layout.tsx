import 'swiper/css'
import '@/theme/styles.scss'

import { getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

import AosInit from '@/common/AosInit'
import { locales } from '@/i18n'
import { appFontClassName } from '@/theme/fonts'
import { cn } from '@/theme/utils'

export async function generateMetadata() {
  const t = await getTranslations({ locale: locales[0], namespace: '' })

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

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        appFontClassName,
        'bg-background-container scroll-pt-20 font-primary',
      )}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
        <link href='/favicon/favicon-dark.png' rel='icon' />
        <link href='/favicon/favicon-dark.png' rel='icon' type='image/x-icon' />
        <link rel='apple-touch-icon' href='/favicon/favicon-dark.png' />
      </head>
      <body>
        <AosInit />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
