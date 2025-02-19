import { time } from '@distributedlab/tools'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import type { HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'

type Props = {
  id: string
  imgUrl: string
  title: string
  desc: string
  date: number
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

export default function Item({
  id,
  imgUrl,
  title,
  desc,
  date,

  className,
  ...rest
}: Props) {
  return (
    <div {...rest} className={cn('flex flex-col gap-6', className)}>
      <img
        className='aspect-[362/186] rounded-2xl object-cover object-center'
        src={imgUrl}
        alt={title}
      />
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
        href={`/blog/${id}`}
        className='absolute bottom-0 left-0 right-0 top-0'
      />
    </div>
  )
}
