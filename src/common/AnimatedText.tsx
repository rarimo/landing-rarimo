'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HTMLAttributes, useEffect, useRef } from 'react'

import { cn } from '@/theme/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string
  accentColor?: string
  className?: string
  endCoef?: number
}

export default function AnimatedText({
  text,
  accentColor,
  className,
  endCoef = 1,
  ...rest
}: Props) {
  const letters = useRef<(HTMLSpanElement | null)[]>([])
  const containerEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerEl.current) return

    gsap.registerPlugin(ScrollTrigger)
    gsap.to(letters.current, {
      scrollTrigger: {
        trigger: containerEl.current,
        scrub: true,
        start: `-=${window.innerHeight / 1.5}`,
        end: `+=${containerEl.current.clientHeight * endCoef}`,
      },
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function splitLetters(word: string) {
    const ACCENT_DIVIDER = '**'
    const startAccentIndex = word.indexOf(ACCENT_DIVIDER)
    const endAccentIndex =
      word.lastIndexOf(ACCENT_DIVIDER) - ACCENT_DIVIDER.length

    return word
      .replaceAll(ACCENT_DIVIDER, '')
      .split('')
      .map((letter, i) => (
        <span
          key={letter + '_' + i}
          ref={el => {
            letters.current.push(el)
          }}
          className='opacity-40'
          style={{
            color:
              i >= startAccentIndex && i <= endAccentIndex
                ? accentColor
                : 'inherit',
          }}
        >
          {letter}
        </span>
      ))
  }

  return (
    <div
      ref={containerEl}
      className={cn(
        'text-h4 flex w-full flex-wrap items-start gap-[0.15em]',
        className,
      )}
      {...rest}
    >
      {text.split(' ').map((word, i) => (
        <p key={`${word}_${i}`}>{splitLetters(word)}</p>
      ))}
    </div>
  )
}
