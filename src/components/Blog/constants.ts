export enum Categories {
  All = 'all',
  Videos = 'video',
  Blog = 'article',
}

export enum SortOptions {
  Date = 'date:asc',
  Newest = 'date:desc',
}

export enum QueryFilters {
  Category = 'type',
  Search = 'title',
  Sort = 'sort',
  Pagination = 'show',
}

export const DEFAULT_PAGINATION_LIMIT = 12
