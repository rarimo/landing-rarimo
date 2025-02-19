import { time } from '@distributedlab/tools'
import type { HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'

import Item from './Item'

type Props = {
  articles: {
    id: number
    documentId: string
    title: string
    shortDescription: string
    date: string
    type: 'article'
    videoUrl?: string
    coverImage: string
  }[]
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

export default function List({ articles, className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn('flex flex-wrap justify-between gap-6', className)}
    >
      {articles.map((el, idx) => (
        <Item
          key={idx}
          className={cn('w-full', 'sm:w-[45%]', 'lg:w-[31%]')}
          title={el.title}
          desc={el.shortDescription}
          imgUrl={el.coverImage}
          date={time(el.date).timestamp}
        />
      ))}
    </div>
  )
}
