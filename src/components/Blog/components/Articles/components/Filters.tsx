'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type HTMLAttributes, useCallback, useState } from 'react'

import {
  Categories,
  QueryFilters,
  SortOptions,
} from '@/components/Blog/constants'
import { cn } from '@/theme/utils'
import {
  UiSelect,
  UiSelectContent,
  UiSelectGroup,
  UiSelectItem,
  UiSelectTrigger,
  UiSelectValue,
} from '@/ui/UiSelect'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'>

const localizeCategory = (category: Categories): string => {
  return (
    {
      [Categories.All]: 'All',
      [Categories.Blog]: 'Blog',
      [Categories.Videos]: 'Videos',
    }[category] ?? ''
  )
}

const localizeSortBy = (sortBy: SortOptions): string => {
  return (
    {
      [SortOptions.Date]: 'Date',
      [SortOptions.Newest]: 'Newest',
      [SortOptions.Popularity]: 'Popularity',
    }[sortBy] ?? ''
  )
}

export default function Filters({ className, ...rest }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [activeCategory, setActiveCategory] = useState(
    searchParams.get(QueryFilters.Category) || Categories.All,
  )

  const [sortedBy, setSortedBy] = useState(
    searchParams.get(QueryFilters.Sort) || SortOptions.Date,
  )

  const navigateWithSanitizedSearchParams = useCallback(
    (cat: string, sort: string) => {
      const params = new URLSearchParams(searchParams)

      setActiveCategory(cat)
      if (cat !== Categories.All) {
        params.set(QueryFilters.Category, cat)
      } else {
        params.delete(QueryFilters.Category)
      }

      setSortedBy(sort)
      if (sort !== SortOptions.Date) {
        params.set(QueryFilters.Sort, sort)
      } else {
        params.delete(QueryFilters.Sort)
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  return (
    <div {...rest} className={cn('flex items-center', className)}>
      <div className={'flex items-center gap-4'}>
        {Object.values(Categories).map((el, idx) => (
          <button
            key={idx}
            className={cn(
              'rounded-full px-4 py-2 transition-colors typography-buttonLarge',
              activeCategory === el && 'bg-componentPrimary',
            )}
            onClick={() => navigateWithSanitizedSearchParams(el, sortedBy)}
          >
            {localizeCategory(el)}
          </button>
        ))}
      </div>

      <div className='ml-auto'>
        <div className='flex items-center'>
          <span className='whitespace-nowrap text-textSecondary typography-buttonMedium'>
            Sort by:
          </span>
          <UiSelect
            value={sortedBy}
            onValueChange={value => {
              navigateWithSanitizedSearchParams(activeCategory, value)
            }}
          >
            <UiSelectTrigger className='flex min-w-[54px] items-center gap-2'>
              <UiSelectValue placeholder='Sort by:' />
            </UiSelectTrigger>
            <UiSelectContent className='bg-backgroundPrimary'>
              <UiSelectGroup>
                {Object.values(SortOptions).map((el, idx) => (
                  <UiSelectItem
                    key={idx}
                    value={el}
                    className='hover:cursor-pointer hover:bg-componentHovered'
                  >
                    {localizeSortBy(el)}
                  </UiSelectItem>
                ))}
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </div>
      </div>
    </div>
  )
}
