'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Container } from '@/ui'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <Container className='flex flex-col items-center bg-backgroundContainer bg-red-600'></Container>
  )
}
