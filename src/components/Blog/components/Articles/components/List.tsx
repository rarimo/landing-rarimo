import { time } from '@distributedlab/tools'
import type { HTMLAttributes } from 'react'

import { ArticleCard } from '@/components/Blog/types'
import { cn } from '@/theme/utils'

import Item from './Item'

type Props = {
  articles: ArticleCard[]
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
          id={String(el.id)}
          title={el.attributes.title}
          desc={el.attributes.shortDescription}
          imgUrl={el.attributes.coverImage}
          date={time(el.attributes.date).timestamp}
        />
      ))}
    </div>
  )
}
