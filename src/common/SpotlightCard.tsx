import { useTheme } from 'next-themes'
import React, { useRef, useState } from 'react'

import { Theme } from '@/enums'
import { darkPalette, lightPalette } from '@/theme/config'

interface Position {
  x: number
  y: number
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string
  spotlightColors?: `rgba(${number}, ${number}, ${number}, ${number})`
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColors,
}) => {
  const divRef = useRef<HTMLDivElement>(null)

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState<number>(0)
  const { theme } = useTheme()

  const _spotlightColor =
    spotlightColors ||
    (theme === Theme.Dark
      ? darkPalette.additionalLight
      : lightPalette.additionalLight)

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current || isFocused) return

    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(0.6)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(0.6)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`borde relative overflow-hidden rounded-3xl bg-additionalOpacited ${className}`}
    >
      <div
        className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out'
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${_spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}

export default SpotlightCard
