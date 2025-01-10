import { useEffect, useRef, useState } from 'react'

interface Props {
  options?: IntersectionObserverInit
  onIntersect: () => void
  onExit?: () => void
  enterThreshold?: number
  exitThreshold?: number
}

export default function IntersectionAnchor({
  onIntersect,
  onExit,
  options,
  enterThreshold = 0,
  exitThreshold = 0,
}: Props) {
  const anchorEl = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [intersectionRatio, setIntersectionRatio] = useState(0)

  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        setIntersectionRatio(entry.intersectionRatio)
      },
      {
        threshold: [exitThreshold, enterThreshold],
        ...options,
      },
    ),
  )

  useEffect(() => {
    if (!anchorEl?.current) return

    observer.current.observe(anchorEl.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => observer.current.disconnect()
  }, [])

  useEffect(() => {
    if (enterThreshold && exitThreshold) {
      if (intersectionRatio >= enterThreshold) {
        onIntersect()
      } else if (onExit && intersectionRatio < exitThreshold) {
        onExit()
      }
    }
  }, [enterThreshold, exitThreshold, intersectionRatio, onExit, onIntersect])

  useEffect(() => {
    if (enterThreshold === 0 && exitThreshold === 0) {
      if (isIntersecting) {
        onIntersect()
      }

      if (onExit) {
        onExit()
      }
    }
  }, [isIntersecting, onIntersect, onExit, enterThreshold, exitThreshold])

  return (
    <div ref={anchorEl} className='absolute bottom-0 left-0 top-0 w-full' />
  )
}
