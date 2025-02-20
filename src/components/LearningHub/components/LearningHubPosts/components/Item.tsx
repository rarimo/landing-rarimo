import { time } from '@distributedlab/tools'
import { Calendar, Play } from 'lucide-react'
import Link from 'next/link'
import type { HTMLAttributes } from 'react'

import { Categories } from '@/components/LearningHub/constants'
import { LearningHubListPost } from '@/components/LearningHub/types'
import { cn } from '@/theme/utils'

type Props = {
  id: string
  imgUrl: string
  title: string
  desc: string
  date: number
  type: LearningHubListPost['attributes']['type']
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

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
  return (
    <div {...rest} className={cn('relative flex flex-col gap-6', className)}>
      <div className='relative w-full overflow-hidden rounded-2xl'>
        <img
          className='aspect-[362/186] object-cover object-center'
          src={imgUrl}
          alt={title}
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
          <Calendar className={'size-4 text-textSecondary'} />
          <span className='text-textSecondary typography-subtitle5'>
            {time(date).format('MMM DD, YYYY')}
          </span>
        </div>

        <span className='line-clamp-3 text-textSecondary typography-body3'>
          {desc}
        </span>
      </div>

      <Link
        href={`/learning-hub/${id}`}
        className='absolute bottom-0 left-0 right-0 top-0'
      />
    </div>
  )
}
