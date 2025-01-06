'use client'

import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/theme/utils'
import { Container } from '@/ui'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <Container
      className={cn(
        'flex flex-col items-center bg-backgroundContainer',
        'bg-[url(/images/bg-sharped-blurred.png)] bg-[length:680px_570px] bg-right-top bg-no-repeat',
        'items-start',
        'justify-end',
        'p-[72px]',
      )}
    >
      <div
        className={cn(
          'flex flex-col items-center gap-4 self-center text-center',
          'md:items-start md:self-start md:text-left',
        )}
      >
        <div
          className={cn(
            'flex items-center gap-2 self-center rounded-full bg-backgroundSurface1 px-3 py-2',
            'md:self-start',
          )}
        >
          <span className='text-textPrimary typography-caption1'>
            Rarimo raised $2.5m
          </span>
          <div className='h-[70%] w-[1px] bg-componentPrimary' />
          <ArrowRightSLineIcon />
        </div>
        <h1 className={cn('flex flex-col')}>
          <span className={cn('typography-display4', 'md:typography-display2')}>
            Your
          </span>
          <span className='flex gap-2'>
            <span
              className={cn(
                'gradient1 bg-clip-text text-transparent typography-display3',
                'md:typography-display1',
              )}
            >
              Device
            </span>

            <span className='gradient1 h-full w-[4px]' />
          </span>
        </h1>
      </div>
    </Container>
  )
}
