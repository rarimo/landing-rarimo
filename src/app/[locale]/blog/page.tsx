'use client'

import Blog from '@/components/Blog'

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <Blog searchParams={searchParams} />
}
