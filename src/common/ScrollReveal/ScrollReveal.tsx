import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { ReactNode, RefObject, useEffect, useMemo, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement>
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null)

  // Allow highlighting portions of text
  // and applying a className in the format [some text][classNameWithoutDot].
  // See example in ProjectSection.
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''

    // Define a regular expression to match patterns like [text][className]
    const regex = /\[([^\]]*)\]\[([^\]]*)\]/g

    const parts = []
    let lastIndex = 0

    let match
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const preText = text.slice(lastIndex, match.index)

        // Split the text into words and spaces
        const wordsWithSpaces = preText.split(/(\s+)/)
        wordsWithSpaces.forEach((word, i) => {
          if (word.trim()) {
            parts.push(
              <span key={`${word}-${i}`} className='word inline-block'>
                {word}
              </span>,
            )
            return
          }
          // If it's just a space, push the space as it is
          parts.push(word)
        })
      }

      // process the matched pattern [text][className]
      parts.push(
        <span key={match[0]} className={match[2] + ' word'}>
          {match[1]}
        </span>,
      )

      // searching for matches in the remaining text
      lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex)
      const wordsWithSpaces = remainingText.split(/(\s+)/) // Split the remaining text into words and spaces
      wordsWithSpaces.forEach((word, i) => {
        if (word.trim()) {
          parts.push(
            <span key={`${word}-${i}`} className='word inline-block'>
              {word}
            </span>,
          )
          return
        }
        // If it's just a space, push the space as it is
        parts.push(word)
      })
    }

    return parts
  }, [children])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true,
        },
      },
    )

    const wordElements = el.querySelectorAll<HTMLElement>('.word')

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, filter: `blur(${blurStrength}px)` },

      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=0%',
          end: wordAnimationEnd,
          scrub: true,
        },
      },
    )

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ])

  return (
    <h2 ref={containerRef} className={`${containerClassName}`}>
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-[1.5] ${textClassName}`}
      >
        {splitText}
      </p>
    </h2>
  )
}

export default ScrollReveal
