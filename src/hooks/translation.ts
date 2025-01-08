import { useLocale, useTranslations } from 'next-intl'

export const useTranslation = () => {
  const t = useTranslations()
  const locale = useLocale()

  return { t, lang: locale }
}
