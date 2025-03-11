import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'

import CloseFillIcon from '@/assets/icons/close-fill-icon.svg'
import DiscordLineIcon from '@/assets/icons/discord-line-icon.svg'
import LogoIcon from '@/assets/icons/logo-icon.svg'
import Menu2FillIcon from '@/assets/icons/menu-2-fill-icon.svg'
import TelegramLineIcon from '@/assets/icons/telegram-line-icon.svg'
import TwitterXFillIcon from '@/assets/icons/twitter-x-fill-icon.svg'
import { AnchorsList, AnchorsListProps, NavItem } from '@/common/HomeSidebar'
import ThemeSwitcher from '@/common/ThemeSwitcher'
import { config } from '@/config'
import { useClickOutside } from '@/hooks'
import { ExtIconLink, UiHorizontalDivider } from '@/ui'
import UiIconButton from '@/ui/UiIconButton'

type HomeHeaderProps = AnchorsListProps

export default function HomeHeader({
  activeLink,
  setActiveLink,
}: HomeHeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => setIsMenuOpen(false))

  return (
    <header className='relative z-50 flex w-full'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          ...(isMenuOpen
            ? { opacity: 0.5, display: 'block' }
            : { opacity: 0, display: 'none' }),
        }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className='fixed inset-0 bg-baseBlack'
      ></motion.div>

      <div
        className={
          'relative flex w-full items-center justify-between bg-backgroundSurface1 px-5 py-5 transition-all'
        }
      >
        <a href='/'>
          <LogoIcon />
        </a>
        <UiIconButton size='small' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseFillIcon /> : <Menu2FillIcon />}
        </UiIconButton>
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='z-100 absolute left-0 top-[100%] w-full overflow-hidden rounded-b-[16px] bg-backgroundSurface1'
      >
        <div ref={menuRef} className='flex flex-col gap-8 px-5 py-8'>
          <nav className='flex flex-col'>
            <AnchorsList
              activeLink={activeLink}
              setActiveLink={link => {
                setActiveLink?.(link)
                setIsMenuOpen(false)
              }}
            />

            <UiHorizontalDivider className={'my-5 w-3 bg-componentPrimary'} />

            <div className='flex flex-col gap-5'>
              <NavItem
                href={'/learning-hub'}
                title={'Learning hub'}
                isActive={pathname === '/learning-hub'}
              />
              <ExtIconLink
                href={config.documentationLink}
                target='_blank'
                className={'text-textSecondary'}
              >
                Documentation
              </ExtIconLink>
            </div>
          </nav>

          <UiHorizontalDivider className='w-full bg-componentPrimary' />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='mt-auto flex flex-col gap-6'
          >
            <div className='flex items-center gap-4'>
              <Link href={config.xLink} target='_blank'>
                <TwitterXFillIcon className={'text-textSecondary'} />
              </Link>
              <Link href={config.telegramLink} target='_blank'>
                <TelegramLineIcon className={'text-textSecondary'} />
              </Link>
              <Link href={config.discordLink} target='_blank'>
                <DiscordLineIcon className={'text-textSecondary'} />
              </Link>
            </div>

            <span className='text-textSecondary typography-body3'>
              Permissionless (ZK) Registries
            </span>

            <ThemeSwitcher />
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
