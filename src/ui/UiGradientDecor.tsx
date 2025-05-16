import { CSSProperties } from 'react'

import { cn } from '@/theme/utils'

export default function UiGradientDecor({
  containerClassName,
  gradientClassName,
  maskStyle,
  ...rest
}: {
  containerClassName?: string
  gradientClassName?: string
  maskStyle?: CSSProperties
}) {
  return (
    <div className={cn('overflow-hidden', containerClassName)}>
      <div
        className={cn(
          'absolute rounded-[50%] blur-[70px] background-gradient',
          gradientClassName,
        )}
        {...rest}
      />
      <div
        className={cn(
          'absolute inset-0',
          'mix-blend-overlay dark:mix-blend-soft-light',
          'background-mask-gradient',
          'pointer-events-none',
        )}
        style={{
          maskImage: 'url("/images/background-mask.png")',
          WebkitMaskImage: 'url("/images/background-mask.png")',
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
          ...maskStyle,
        }}
      />
    </div>
  )
}
