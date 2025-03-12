'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BackLink({ referer }: { referer: string | null }) {
  const router = useRouter()

  const host = window.location.host

  const goBack = () => {
    if (referer?.includes('/learning-hub') && referer.includes(host)) {
      router.back()
      return
    }

    router.replace('/learning-hub')
  }

  return (
    <button
      className={'p-4 md:absolute md:left-0 md:top-0 md:p-0'}
      data-aos='fade-in'
      onClick={goBack}
    >
      <ArrowLeft className='size-4 text-textSecondary' />
    </button>
  )
}
