'use client'

import { HTMLAttributes, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

import ClientOnly from '@/common/ClientOnly'
import { cn } from '@/theme/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  isCloseByClickOutside?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  isCloseByClickOutside = true,
  children,
  ...rest
}: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose],
  )

  const handleBackdropClick = useCallback(() => {
    if (!isCloseByClickOutside) return

    onClose()
  }, [isCloseByClickOutside, onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <ClientOnly>
      {() =>
        createPortal(
          <div
            {...rest}
            className={cn(
              'fixed left-0 top-0 z-[100] flex h-screen w-screen transition-all duration-300 ease-in-out',
              isOpen
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-full opacity-0',
              rest.className,
            )}
          >
            <button
              className='absolute left-0 top-0 h-full w-full cursor-auto border-none bg-black opacity-40'
              onClick={handleBackdropClick}
            />
            {children}
          </div>,
          document.body,
        )
      }
    </ClientOnly>
  )
}
