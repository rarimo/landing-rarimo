'use client'

import { ChevronDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  DEFAULT_PAGINATION_LIMIT,
  QueryFilters,
} from '@/components/LearningHub/constants'

export default function LoadMoreButton() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentLimit =
    searchParams.get(QueryFilters.Pagination) ?? DEFAULT_PAGINATION_LIMIT

  const showMore = () => {
    const params = new URLSearchParams(searchParams)

    params.set(
      QueryFilters.Pagination,
      `${Number(currentLimit) + DEFAULT_PAGINATION_LIMIT}`,
    )
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  return (
    <button
      className='mx-auto mt-14 flex items-center gap-1'
      onClick={showMore}
    >
      <span className='text-textSecondary typography-buttonMedium'>
        Show more
      </span>
      <ChevronDown className={'size-4 text-textSecondary'} />
    </button>
  )
}
