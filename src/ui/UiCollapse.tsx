'use client'

import { AnimatePresence, motion, MotionProps } from 'framer-motion'
import { HTMLAttributes, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  isOpen: boolean
  duration?: number
} & HTMLAttributes<HTMLDivElement> &
  MotionProps

export default function UiCollapse({
  isOpen,
  duration = 0.25,
  children,
  ...rest
}: Props) {
  const uid = useMemo(() => uuidv4(), [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...rest}
          key={`collapse-${uid}`}
          initial='collapsed'
          animate='open'
          exit='collapsed'
          variants={{
            open: { opacity: 1, height: 'auto', overflowY: 'hidden' },
            collapsed: { opacity: 0, height: 0, overflowY: 'hidden' },
          }}
          transition={{ duration: duration }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
