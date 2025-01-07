import { ComponentProps, HTMLAttributes } from 'react'

import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { cn } from '@/theme/utils'

export function ArrowIconButtonLeft({
  isDisabled,
  ...rest
}: ComponentProps<typeof ArrowIconButton>) {
  return (
    <ArrowIconButton {...rest} isDisabled={isDisabled}>
      <ArrowRightSLineIcon
        className={cn(
          'rotate-180 text-textPrimary',
          isDisabled && 'text-textDisabled',
        )}
      />
    </ArrowIconButton>
  )
}

export function ArrowIconButtonRight({
  isDisabled,
  ...rest
}: ComponentProps<typeof ArrowIconButton>) {
  return (
    <ArrowIconButton {...rest} isDisabled={isDisabled}>
      <ArrowRightSLineIcon
        className={cn('text-textPrimary', isDisabled && 'text-textDisabled')}
      />
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
      disabled={isDisabled}
      className={cn(
        'flex size-12 items-center justify-center rounded-full',
        !isDisabled && 'bg-backgroundSurface1',
        className,
      )}
    />
  )
}
