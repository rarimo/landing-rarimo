import { AnimatePresence } from 'motion/react'

import {
  Categories,
  DEFAULT_PAGINATION_LIMIT,
  QueryFilters,
  SortOptions,
} from '@/components/LearningHub/constants'
import { LearningHubListPost } from '@/components/LearningHub/types'
import { config } from '@/config'

import LearningHubFilters from './components/LearningHubFilters'
import List from './components/List'
import LoadMoreButton from './components/LoadMoreButton'

export default async function LearningHubPosts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const filters = (await searchParams) as {
    [QueryFilters.Category]?: Categories
    [QueryFilters.Search]?: string
    [QueryFilters.Sort]?: SortOptions
    [QueryFilters.Pagination]?: number
  }

  const loadPosts = async (): Promise<{
    data: LearningHubListPost[]
    meta: { pagination: { start: 0; limit: 2; total: 6 } }
  }> => {
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

    const sortFilter = filters[QueryFilters.Sort] ?? SortOptions.Newest

    const sortOption = sortFilter.split('=')
    const sortKey = `${QueryFilters.Sort}${sortOption[0]}`

    queryFilters.append(sortKey, sortOption[1])

    queryFilters.append(`pagination[start]`, '0')
    queryFilters.append(
      `pagination[limit]`,
      String(filters[QueryFilters.Pagination] ?? DEFAULT_PAGINATION_LIMIT),
    )

    const response = await fetch(
      `${config.learningHubApiUrl}/posts?${queryFilters.toString()}`,
      { next: { revalidate: config.learningHubApiCacheInvalidateDur } },
    )

    return response.json()
  }

  const { data: posts, meta } = await loadPosts()

  return (
    <div className='flex flex-col'>
      <LearningHubFilters className='mt-10' data-aos='fade' />

      <AnimatePresence>
        {posts?.length ? (
          <List className='mt-10' posts={posts} data-aos='fade' />
        ) : (
          <div className='my-14 flex' data-aos='fade'>
            <span className='mx-auto text-center text-textPrimary typography-h4'>
              No posts found
            </span>
          </div>
        )}
      </AnimatePresence>
      {posts?.length < meta?.pagination.total && <LoadMoreButton />}
    </div>
  )
}
