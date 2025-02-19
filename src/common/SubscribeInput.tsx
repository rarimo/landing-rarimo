import type { HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'>

export default function SubscribeInput({ className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn(
        'mt-8 flex w-full max-w-[413px] items-center overflow-hidden rounded-[32px] bg-backgroundSurface1 shadow-[0px_0px_0px_0.5px_#0000001A,0px_2px_2px_0px_#0000000A,0px_4px_4px_0px_#0000000A]',
        className,
      )}
    >
      <input
        className='line-clamp-1 flex-1 bg-transparent px-4 py-3 outline-0 typography-body3'
        placeholder={'Enter email and subscribe'}
      />
      <button className='px-4 py-3 text-textPrimary typography-buttonMedium'>
        Subscribe
      </button>
    </div>
  )
}
