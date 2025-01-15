'use client'

import { VariantProps } from 'class-variance-authority'
import { forwardRef, useMemo } from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '@/theme/utils'

const iconButtonTv = tv({
  slots: {
    container: cn(
      'flex items-center justify-center rounded-full',
      'transition-colors duration-300',
    ),
    icon: cn('flex items-center justify-center'),
  },

  variants: {
    size: {
      xsmall: {
        container: cn('w-6 h-6'),
        icon: cn('w-[16px] h-[16px]'),
      },
      small: {
        container: cn('w-8 h-8'),
        icon: cn('width-[20px] height-[20px]'),
      },
      medium: {
        container: cn('w-10 h-10'),
        icon: cn('width-[20px] height-[20px]'),
      },
      large: {
        container: cn('w-12 h-12'),
        icon: cn('width-[24px] height-[24px]'),
      },
    },

    variant: {
      filled: {},
      outlined: {
        container: cn('border border-solid border-transparent bg-transparent'),
      },
      simple: {
        container: cn('bg-transparent'),
      },
    },

    color: {
      primary: {},
      white: {},
    },

    disabled: {
      true: {},
    },
  },

  compoundVariants: [
    // filled-primary
    {
      variant: 'filled',
      color: 'primary',
      class: {
        container: cn(
          'bg-componentPrimary',
          'hover:bg-componentHovered active:bg-componentPressed',
        ),
      },
    },
    {
      variant: 'filled',
      color: 'white',
      class: {
        container: cn('bg-backgroundSurface1'),
      },
    },
    {
      variant: 'filled',
      disabled: true,
      class: {
        container: cn(
          'bg-transparent',
          'hover:bg-transparent active:bg-transparent',
        ),
        icon: cn('text-textDisabled'),
      },
    },
    {
      variant: 'filled',
      color: 'white',
      disabled: true,
      class: {
        container: cn('bg-transparent'),
        icon: cn('text-textDisabled'),
      },
    },

    // outlined-primary
    {
      variant: 'outlined',
      color: 'primary',
      class: {
        container: cn(
          'border-componentPrimary',
          'hover:border-componentHovered active:border-componentPressed',
        ),
      },
    },
    {
      variant: 'outlined',
      disabled: true,
      class: {
        container: cn('border-componentDisabled'),
        icon: cn('text-textDisabled'),
      },
    },
    // simple-primary
    {
      variant: 'simple',
      color: 'primary',
      class: {
        container: cn(
          'bg-transparent',
          // 'hover:bg-componentHovered active:bg-componentPressed',
        ),
        icon: cn('text-textPrimary'),
      },
    },
    {
      variant: 'simple',
      disabled: true,
      class: {
        icon: cn('text-textDisabled'),
      },
    },
  ],

  defaultVariants: {
    size: 'medium',
    color: 'primary',
    variant: 'filled',
  },
})

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonTv> & {
    iconClassName?: string
  }

const UiIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant,
      size,
      color,
      disabled,
      children,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      iconClassName,
      ...rest
    },
    ref,
  ) => {
    const baseStyles = useMemo(
      () =>
        iconButtonTv({
          variant,
          size,
          color,
          disabled,
        }),
      [size, color, disabled, variant],
    )

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseDown?.(event)
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseUp?.(event)
    }

    const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
      onTouchStart?.(event)
    }

    const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
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
        className={cn(baseStyles.container(), rest.className)}
        aria-hidden='true'
      >
        <span className={cn(baseStyles.icon(), iconClassName)}>{children}</span>
      </button>
    )
  },
)

export default UiIconButton
