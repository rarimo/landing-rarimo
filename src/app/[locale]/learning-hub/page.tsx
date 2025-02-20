'use client'

import LearningHub from '@/components/LearningHub'

export default function LearningHubPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <LearningHub searchParams={searchParams} />
}
