import { CSSProperties } from 'react'

import { cn } from '@/theme/utils'

export default function UiGradientDecor({
  containerClassName,
  gradientClassName,
  maskStyle,
}: {
  containerClassName?: string
  gradientClassName?: string
  maskStyle?: CSSProperties
}) {
  return (
    <div className={cn(containerClassName)}>
      <div
        className={cn(
          'rounded-[50%] blur-[70px] background-gradient',
          'absolute',
          gradientClassName,
        )}
      />
      <div
        className={cn(
          'absolute inset-0',
          'mix-blend-overlay dark:mix-blend-soft-light',
          'background-mask-gradient',
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
