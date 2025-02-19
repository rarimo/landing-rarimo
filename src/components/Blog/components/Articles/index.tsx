import { ChevronDown } from 'lucide-react'

import {
  Categories,
  QueryFilters,
  SortOptions,
} from '@/components/Blog/constants'
import { config } from '@/config'

import Filters from './components/Filters'
import List from './components/List'

export default async function Articles({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filters = (await searchParams) as {
    [QueryFilters.Category]?: Categories
    [QueryFilters.Search]?: string
    [QueryFilters.Sort]?: SortOptions
  }

  const queryFilters = new URLSearchParams()

  if (filters[QueryFilters.Category]) {
    queryFilters.append(
      `filters[${QueryFilters.Category}]`,
      filters[QueryFilters.Category],
    )
  }

  if (filters[QueryFilters.Search]) {
    queryFilters.append(
      `filters[${QueryFilters.Search}][$containsi]`,
      filters[QueryFilters.Search],
    )
  }

  if (filters[QueryFilters.Sort]) {
    queryFilters.append(QueryFilters.Sort, filters[QueryFilters.Sort])
  }

  const response = await fetch(
    `${config.blogApiUrl}/posts?${queryFilters.toString()}`,
  )

  const { data: articles } = await response.json()

  return (
    <div className='flex flex-col'>
      <Filters className='mt-10' />

      {articles?.length ? (
        <List className='mt-10' articles={articles} />
      ) : (
        <div className='my-14 flex'>
          <span className='mx-auto text-center text-textPrimary typography-h4'>
            No articles found
          </span>
        </div>
      )}

      <button className='mx-auto mt-14 flex items-center gap-1'>
        <span className='text-textSecondary typography-buttonMedium'>
          Show more
        </span>
        <ChevronDown className={'size-4 text-textSecondary'} />
      </button>
    </div>
  )
}
