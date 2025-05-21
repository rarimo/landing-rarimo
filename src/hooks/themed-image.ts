'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Theme } from '@/enums'

export function useThemedImage({
  light,
  dark,
}: {
  light: string
  dark: string
}) {
  const { resolvedTheme } = useTheme()
  const [src, setSrc] = useState<string>(light)

  useEffect(() => {
    setSrc(resolvedTheme === Theme.Dark ? dark : light)
  }, [resolvedTheme, light, dark])

  return src
}
