'use client'

import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type HTMLAttributes, useCallback, useState } from 'react'

import {
  Categories,
  QueryFilters,
  SortOptions,
} from '@/components/LearningHub/constants'
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
      [Categories.Videos]: 'Videos',
      [Categories.Blog]: 'Blog',
    }[category] ?? ''
  )
}

const localizeSortBy = (sortBy: SortOptions): string => {
  return (
    {
      [SortOptions.Newest]: 'Newest',
      [SortOptions.Oldest]: 'Oldest',
    }[sortBy] ?? ''
  )
}

export default function LearningHubFilters({ className, ...rest }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [activeCategory, setActiveCategory] = useState(
    searchParams.get(QueryFilters.Category) || Categories.All,
  )

  const [sortedBy, setSortedBy] = useState(
    searchParams.get(QueryFilters.Sort) || SortOptions.Newest,
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
      if (sort !== SortOptions.Newest) {
        params.set(QueryFilters.Sort, sort)
      } else {
        params.delete(QueryFilters.Sort)
      }

      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    },
    [pathname, router, searchParams],
  )

  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col items-center gap-4',
        'sm:flex-row',
        className,
      )}
    >
      <div className={'flex items-center gap-4'}>
        {Object.values(Categories).map((el, idx) => (
          <button
            key={idx}
            className={cn(
              'relative px-4 py-2 text-textSecondary transition-colors duration-200 typography-buttonLarge',
            )}
            onClick={() => navigateWithSanitizedSearchParams(el, sortedBy)}
          >
            {localizeCategory(el)}
            {activeCategory === el && (
              <motion.div
                className='absolute inset-0 rounded-full bg-componentPrimary text-textPrimary'
                layoutId='learning-navbar'
              />
            )}
          </button>
        ))}
      </div>

      <div className={cn('sm:ml-auto')}>
        <div className='flex items-center'>
          <span className='whitespace-nowrap text-textSecondary typography-buttonMedium'>
            Sort:
          </span>
          <UiSelect
            value={sortedBy}
            onValueChange={value => {
              navigateWithSanitizedSearchParams(activeCategory, value)
            }}
          >
            <UiSelectTrigger className='flex min-w-[54px] items-center gap-2'>
              <UiSelectValue placeholder='Sort:' />
            </UiSelectTrigger>
            <UiSelectContent className='rounded-lg border-componentPrimary bg-backgroundPrimary'>
              <UiSelectGroup>
                {Object.values(SortOptions).map((el, idx) => (
                  <UiSelectItem
                    key={idx}
                    value={el}
                    className='cursor-pointer rounded-md hover:bg-componentPrimary'
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
