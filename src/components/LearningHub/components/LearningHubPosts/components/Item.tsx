import { time } from '@distributedlab/tools'
import { Calendar, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { HTMLAttributes } from 'react'
import { useState } from 'react'

import { Categories } from '@/components/LearningHub/constants'
import { LearningHubListPost } from '@/components/LearningHub/types'
import { slugify } from '@/helpers/slug'
import { cn } from '@/theme/utils'

type Props = {
  id: string
  imgUrl: string
  title: string
  desc: string
  date: number
  type: LearningHubListPost['attributes']['type']
} & Omit<HTMLAttributes<HTMLAnchorElement>, 'children'>

export default function Item({
  id,
  imgUrl,
  title,
  desc,
  date,
  type,
  className,
  ...rest
}: Props) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Link
      href={`/learning-hub/${slugify(title)}-${id}`}
      className={cn('group relative flex flex-col gap-6', className)}
      {...rest}
    >
      <div className='relative aspect-[362/186] w-full overflow-hidden rounded-2xl'>
        {isLoading && (
          <div className='absolute inset-0 animate-pulse bg-componentPrimary' />
        )}
        <Image
          src={imgUrl}
          alt={title}
          fill
          className='object-cover object-center transition-all duration-300 group-hover:scale-110 group-hover:brightness-75'
          onLoadingComplete={() => setIsLoading(false)}
        />
        {type === Categories.Videos && (
          <div className='absolute left-3 top-3 size-8 rounded-full bg-backgroundSurface2 backdrop-blur-[20px]'>
            <Play className='absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-textPrimary' />
          </div>
        )}
      </div>
      <div className='flex flex-col'>
        <span className='text-textPrimary typography-subtitle2'>{title}</span>
        <div className='mb-3 mt-2 flex items-center gap-2'>
          <Calendar className='size-4 text-textSecondary' />
          <span className='text-textSecondary typography-subtitle5'>
            {time(date).format('MMM DD, YYYY')}
          </span>
        </div>
        <span className='line-clamp-3 text-textSecondary typography-body3'>
          {desc}
        </span>
      </div>
    </Link>
  )
}
