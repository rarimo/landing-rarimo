import { time } from '@distributedlab/tools'
import type { HTMLAttributes } from 'react'

import { LearningHubListPost } from '@/components/LearningHub/types'
import { cn } from '@/theme/utils'

import Item from './Item'

type Props = {
  posts: LearningHubListPost[]
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

export default function List({ posts, className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn('flex flex-wrap justify-start gap-6', className)}
    >
      {posts.map((el, idx) => (
        <Item
          key={idx}
          className={cn('w-full', 'sm:w-[47%]', 'lg:w-[31.5%]')}
          id={String(el.id)}
          title={el.attributes.title}
          desc={el.attributes.shortDescription}
          imgUrl={el.attributes.coverImage}
          date={time(el.attributes.date).timestamp}
          type={el.attributes.type}
        />
      ))}
    </div>
  )
}
