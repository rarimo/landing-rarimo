'use client'

import Script from 'next/script'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

import { Theme } from '@/enums'

// This component is used to load the Twitter widget script
// to render the Twitter embeds in the post:
// https://developer.x.com/en/docs/x-for-websites/embedded-tweets/overview
export default function TwitterWidget() {
  const { resolvedTheme } = useTheme()

  // Set the Twitter theme based on the current theme
  // https://developer.x.com/en/docs/x-for-websites/webpage-properties
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'twitter:widgets:theme'
    meta.content = resolvedTheme === Theme.Dark ? 'dark' : 'light'
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [resolvedTheme])

  // Convert Twitter links to Twitter embeds
  useEffect(() => {
    window.twttr?.widgets?.load()
  }, [])

  return (
    <>
      <Script async src='https://platform.twitter.com/widgets.js' />
    </>
  )
}
