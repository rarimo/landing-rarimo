import { ComponentProps, HTMLAttributes } from 'react'

import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { cn } from '@/theme/utils'

export function ArrowIconButtonLeft({
  ...rest
}: ComponentProps<typeof ArrowIconButton>) {
  return (
    <ArrowIconButton {...rest}>
      <ArrowRightSLineIcon className={'rotate-180 text-textDisabled'} />
    </ArrowIconButton>
  )
}

export function ArrowIconButtonRight({
  ...rest
}: ComponentProps<typeof ArrowIconButton>) {
  return (
    <ArrowIconButton {...rest}>
      <ArrowRightSLineIcon />
    </ArrowIconButton>
  )
}

export function ArrowIconButton({
  isDisabled,
  className,
  ...rest
}: { isDisabled?: boolean } & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        'flex size-12 items-center justify-center rounded-full',
        !isDisabled && 'bg-backgroundSurface1',
        className,
      )}
    />
  )
}
