import { motion, useInView } from 'framer-motion'
import React, { PropsWithChildren, useRef } from 'react'

const VISIBLE_ITEMS = 4

export default function SliderMotionCard({
  idx,
  children,
}: { idx: number } & PropsWithChildren) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -225px 0px',
  })

  const delay = Math.min(idx, VISIBLE_ITEMS) * 0.1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.94,
      }}
      transition={{
        type: 'tween',
        delay,
      }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
