import {
  Categories,
  DEFAULT_PAGINATION_LIMIT,
  QueryFilters,
  SortOptions,
} from '@/components/Blog/constants'
import { ArticleCard } from '@/components/Blog/types'
import { config } from '@/config'

import BlogFilters from './components/BlogFilters'
import List from './components/List'
import LoadMoreButton from './components/LoadMoreButton'

export default async function Articles({
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

  const loadArticles = async (): Promise<{
    data: ArticleCard[]
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

    if (filters[QueryFilters.Sort]) {
      queryFilters.append(QueryFilters.Sort, filters[QueryFilters.Sort])
    }

    queryFilters.append(`pagination[start]`, '0')
    queryFilters.append(
      `pagination[limit]`,
      String(filters[QueryFilters.Pagination] ?? DEFAULT_PAGINATION_LIMIT),
    )

    const response = await fetch(
      `${config.blogApiUrl}/posts?${queryFilters.toString()}`,
    )

    return response.json()
  }

  const { data: articles, meta } = await loadArticles()

  return (
    <div className='flex flex-col'>
      <BlogFilters className='mt-10' />

      {articles?.length ? (
        <List className='mt-10' articles={articles} />
      ) : (
        <div className='my-14 flex'>
          <span className='mx-auto text-center text-textPrimary typography-h4'>
            No articles found
          </span>
        </div>
      )}
      {articles.length < meta.pagination.total && <LoadMoreButton />}
    </div>
  )
}
