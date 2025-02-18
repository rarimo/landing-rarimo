import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useCallback, useMemo, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'

import CloseFillIcon from '@/assets/icons/close-fill-icon.svg'
import RarimoIcon from '@/assets/icons/rarimo-icon.svg'
import ClientOnly from '@/common/ClientOnly'
import { config } from '@/config'
import { Theme } from '@/enums'
import { isAndroid, isIos, isMediumScreen } from '@/helpers'
import { darkPalette, lightPalette } from '@/theme/config'
import { cn } from '@/theme/utils'
import { UiButton, UiIconButton } from '@/ui'

const CLOSE_DOWNLOAD_BLOCK_ANIMATION = {
  initial: { opacity: 0, scale: 1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export default function QRCodeBlock() {
  const [isQRCodeShown, setIsQRCodeShown] = useState(true)
  const isMdDown = isMediumScreen()

  return (
    <ClientOnly>
      {() => (
        <div className='z-10'>
          <AnimatePresence>
            {!isMdDown && isQRCodeShown && (
              <DesktopQRCodeBlock
                onBlockClose={() => setIsQRCodeShown(false)}
              />
            )}
            {isMdDown && isQRCodeShown && (
              <MobileQRCodeBlock onBlockClose={() => setIsQRCodeShown(false)} />
            )}
          </AnimatePresence>
        </div>
      )}
    </ClientOnly>
  )
}

function DesktopQRCodeBlock({ onBlockClose }: { onBlockClose: () => void }) {
  const { resolvedTheme } = useTheme()

  const palette = useMemo(
    () => (resolvedTheme === Theme.Dark ? darkPalette : lightPalette),
    [resolvedTheme],
  )

  return (
    <motion.div
      variants={CLOSE_DOWNLOAD_BLOCK_ANIMATION}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.3 }}
      className={cn(
        'flex flex-col items-center justify-center',
        'rounded-2xl bg-backgroundSurface1 p-1.5',
        'fixed bottom-10 right-10',
        'shadow-[0px_4px_4px_0px_#0000000D,0px_2px_2px_0px_#0000000D,0px_1px_1px_0px_#0000000D,0px_0px_0px_0.33px_#0000000D]',
      )}
    >
      <UiIconButton
        className='absolute right-1 top-1'
        iconClassName='text-textSecondary hover:text-textPrimary transition duration-300'
        variant='simple'
        size='xsmall'
        onClick={onBlockClose}
      >
        <CloseFillIcon />
      </UiIconButton>
      <span className='px-3 pt-3 text-center typography-caption2'>
        Download the <br /> RariMe app
      </span>
      <QRCode
        value={config.universityLink}
        size={105}
        enableCORS
        qrStyle='dots'
        eyeRadius={10}
        bgColor={palette.backgroundSurface1}
        fgColor={palette.invertedDark}
      />
    </motion.div>
  )
}

function MobileQRCodeBlock({ onBlockClose }: { onBlockClose: () => void }) {
  const handleDownloadLink = useCallback(() => {
    if (isIos()) {
      window.open(config.appStoreLink, '_blank')

      return
    }

    if (isAndroid()) {
      window.open(config.googlePlayLink, '_blank')

      return
    }
  }, [])

  return (
    <motion.div
      variants={CLOSE_DOWNLOAD_BLOCK_ANIMATION}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.3 }}
      className={cn(
        'flex justify-between',
        'rounded-2xl bg-backgroundSurface1 p-4',
        'fixed bottom-3 left-3 right-3 z-20',
        'shadow-[0px_4px_4px_0px_#0000000D,0px_2px_2px_0px_#0000000D,0px_1px_1px_0px_#0000000D,0px_0px_0px_0.33px_#0000000D]',
      )}
    >
      <UiIconButton
        className='absolute right-0.5 top-0'
        iconClassName='text-textSecondary'
        variant='simple'
        size='xsmall'
        onClick={onBlockClose}
      >
        <CloseFillIcon />
      </UiIconButton>
      <div className='flex items-center gap-2'>
        <RarimoIcon />
        <div className='flex flex-col'>
          <span className='typography-h6'>RariMe</span>
          <span className='text-textSecondary typography-body4'>
            Go Incognito
          </span>
        </div>
      </div>
      <UiButton
        size='small'
        onClick={handleDownloadLink}
        textClassName='text-invertedLight'
        containerClassName='bg-invertedDark'
      >
        Download
      </UiButton>
    </motion.div>
  )
}
