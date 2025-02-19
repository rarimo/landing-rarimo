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

  const response = await fetch(`${config.blogApiUrl}/posts`)

  const articles = await response.json()

  return (
    <div className='flex flex-col'>
      <Filters className='mt-10' />
      <List className='mt-10' articles={articles.data} />

      <button className='mx-auto mt-14 flex items-center gap-1'>
        <span className='text-textSecondary typography-buttonMedium'>
          Show more
        </span>
        <ChevronDown className={'size-4 text-textSecondary'} />
      </button>
    </div>
  )
}
