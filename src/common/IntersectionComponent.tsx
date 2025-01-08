import { useIntersectionObserver } from '@uidotdev/usehooks'
import { PropsWithChildren, useEffect } from 'react'

export default function IntersectionComponent({
  children,
  onIntersect,
  id,
}: PropsWithChildren<{
  onIntersect: () => void
  id?: string
}>) {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })

  useEffect(() => {
    if (!entry?.isIntersecting) return

    onIntersect()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting])

  return (
    <div id={id} ref={ref}>
      {children}
    </div>
  )
}
