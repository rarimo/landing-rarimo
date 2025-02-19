export enum Categories {
  All = 'all',
  Videos = 'video',
  Blog = 'article',
}

export enum SortOptions {
  Date = 'date:asc',
  Popularity = 'popularity',
  Newest = 'date:desc',
}

export enum QueryFilters {
  Category = 'type',
  Search = 'title',
  Sort = 'sort',
}
