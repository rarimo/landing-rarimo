'use client'

import { VariantProps } from 'class-variance-authority'
import { forwardRef, useMemo, useState } from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '@/theme/utils'

const iconButtonTv = tv({
  slots: {
    container: cn('flex items-center justify-center rounded-full'),
    icon: cn('text-textPrimary'),
  },

  variants: {
    size: {
      small: {
        container: cn('w-8 h-8'),
        icon: cn('size-[20px]'),
      },
      medium: {
        container: cn('w-10 h-10'),
        icon: cn('size-[20px]'),
      },
      large: {
        container: cn('w-12 h-12'),
        icon: cn('size-[24px]'),
      },
    },

    color: {
      default: {
        container: cn('bg-componentPrimary text-textPrimary'),
      },
    },

    disabled: {
      true: {},
    },
    pressed: {
      true: {},
    },
  },

  compoundVariants: [
    // pressed
    {
      pressed: true,
      class: {
        container: cn('bg-componentHovered text-textPrimary'),
      },
    },
    // disabled
    {
      disabled: true,
      class: {
        container: cn(
          'bg-componentDisabled text-textDisabled cursor-not-allowed',
        ),
        icon: cn('text-textDisabled'),
      },
    },
  ],

  defaultVariants: {
    size: 'medium',
    color: 'default',
  },
})

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonTv>

const UiIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size,
      color,
      disabled,
      children,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      ...rest
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = useState(false)

    const baseStyles = useMemo(
      () =>
        iconButtonTv({
          size,
          color,
          disabled,
          pressed: isPressed,
        }),
      [size, color, disabled, isPressed],
    )

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(true)
      onMouseDown?.(event)
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      onMouseUp?.(event)
    }

    const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
      setIsPressed(true)
      onTouchStart?.(event)
    }

    const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      onTouchEnd?.(event)
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        {...rest}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(baseStyles.container())}
      >
        {children}
        {/*<div className={cn(baseStyles.icon())}></div>*/}
      </button>
    )
  },
)

export default UiIconButton
