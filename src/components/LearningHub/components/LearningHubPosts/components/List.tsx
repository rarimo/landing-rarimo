'use client'

import { time } from '@distributedlab/tools'
import { motion } from 'framer-motion'
import type { HTMLAttributes } from 'react'

import { LearningHubListPost } from '@/components/LearningHub/types'
import { cn } from '@/theme/utils'

import Item from './Item'

type Props = {
  posts: LearningHubListPost[]
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

const VISIBLE_ITEMS = 12

export default function List({ posts, className, ...rest }: Props) {
  const newItems = posts.slice(-VISIBLE_ITEMS)

  return (
    <div
      {...rest}
      className={cn('flex flex-wrap justify-start gap-6', className)}
    >
      {posts.map((el, idx) => {
        const animIdx = idx % newItems.length

        return (
          <motion.div
            key={el.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: animIdx * 0.2,
              ease: 'easeOut',
            }}
            className={cn('w-full', 'sm:w-[47%]', 'lg:w-[31.5%]')}
          >
            <Item
              id={String(el.id)}
              title={el.attributes.title}
              desc={el.attributes.shortDescription}
              imgUrl={el.attributes.coverImage}
              date={time(el.attributes.date).timestamp}
              type={el.attributes.type}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
