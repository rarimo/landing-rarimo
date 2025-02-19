'use client'

import { type HTMLAttributes, useState } from 'react'

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

export default function Filters({ className, ...rest }: Props) {
  const categories = ['All', 'Blog', 'Videos']
  const [activeCategory, setActiveCategory] = useState('All')

  const sortOptions = ['Date', 'Popularity', 'Newest']
  const [sortedBy, setSortedBy] = useState('Date')

  return (
    <div {...rest} className={cn('flex items-center', className)}>
      <div className={'flex items-center gap-4'}>
        {categories.map((el, idx) => (
          <button
            key={idx}
            className={cn(
              'rounded-full px-4 py-2 transition-colors typography-buttonLarge',
              activeCategory === el && 'bg-componentPrimary',
            )}
            onClick={() => setActiveCategory(el)}
          >
            {el}
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
            onValueChange={value => setSortedBy(value)}
          >
            <UiSelectTrigger className='flex min-w-[54px] items-center gap-2'>
              <UiSelectValue placeholder='Sort by:' />
            </UiSelectTrigger>
            <UiSelectContent className='bg-backgroundPrimary'>
              <UiSelectGroup>
                {sortOptions.map((el, idx) => (
                  <UiSelectItem
                    key={idx}
                    value={el}
                    className='hover:cursor-pointer hover:bg-componentHovered'
                  >
                    {el}
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
