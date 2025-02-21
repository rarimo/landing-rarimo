export enum Categories {
  All = 'all',
  Videos = 'video',
  Blog = 'article',
}

export enum SortOptions {
  Oldest = 'date:asc',
  Newest = 'date:desc',
}

export enum QueryFilters {
  Category = 'type',
  Search = 'title',
  Sort = 'sort',
  Pagination = 'show',
}

export const DEFAULT_PAGINATION_LIMIT = 12
