import Link from 'next/link'
import { HTMLAttributes } from 'react'

import DiscordLineIcon from '@/assets/icons/discord-line-icon.svg'
import LogoIcon from '@/assets/icons/logo-icon.svg'
import TelegramLineIcon from '@/assets/icons/telegram-line-icon.svg'
import TwitterXFillIcon from '@/assets/icons/twitter-x-fill-icon.svg'
import ThemeSwitcher from '@/common/ThemeSwitcher'
import { config } from '@/config'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'
import { ExtIconLink, UiHorizontalDivider } from '@/ui'

type HomeSidebarProps = {
  activeLink: Anchors
  setActiveLink: (link: Anchors) => void
} & HTMLAttributes<HTMLDivElement>

export function HomeSidebar({
  activeLink,
  setActiveLink,
  className,
  ...rest
}: HomeSidebarProps) {
  const linkStyle =
    'text-textSecondary transition duration-300 hover:text-textPrimary'

  return (
    <aside {...rest} className={cn('flex size-full flex-col', className)}>
      <div className='mb-14 max-w-[105px]'>
        <a href='/'>
          <LogoIcon />
        </a>
      </div>

      <nav className='flex flex-1 flex-col'>
        <AnchorsList
          activeLink={activeLink}
          setActiveLink={link => {
            setActiveLink(link)
          }}
        />

        <UiHorizontalDivider className={'my-5 w-3 bg-componentPrimary'} />

        <div className='flex flex-col gap-5'>
          <AnchorNavItem
            href={'/blog'}
            title={'Learning hub'}
            isActive={false}
            onClick={() => {}}
          />
          <ExtIconLink
            href={config.documentationLink}
            target='_blank'
            className={linkStyle}
          >
            Documentation
          </ExtIconLink>
        </div>
      </nav>

      <div className='mt-auto flex flex-col gap-6'>
        <div className='flex items-center gap-4'>
          <Link href={config.xLink} target='_blank'>
            <TwitterXFillIcon className={linkStyle} />
          </Link>
          <Link href={config.telegramLink} target='_blank'>
            <TelegramLineIcon className={linkStyle} />
          </Link>
          <Link href={config.discordLink} target='_blank'>
            <DiscordLineIcon className={linkStyle} />
          </Link>
        </div>

        <span className='text-textSecondary typography-body3'>
          Permissionless (ZK) Registries
        </span>

        <ThemeSwitcher />
      </div>
    </aside>
  )
}

type AnchorsListProps = {
  activeLink: Anchors
  setActiveLink: (link: Anchors) => void
} & HTMLAttributes<HTMLDivElement>

export function AnchorsList({
  activeLink,
  setActiveLink,
  className,
  ...rest
}: AnchorsListProps) {
  const sectionAnchors = [
    { title: 'Home', anchor: Anchors.Home },
    { title: 'Ecosystem', anchor: Anchors.Ecosystem },
    { title: 'L2: ZK Registries', anchor: Anchors.ZkRegistries },
    { title: 'Community', anchor: Anchors.Community },
  ]

  return (
    <div {...rest} className={cn('flex flex-col gap-5', className)}>
      {sectionAnchors.map(({ title, anchor }) => (
        <AnchorNavItem
          key={anchor}
          title={title}
          href={`#${anchor}`}
          isActive={activeLink === anchor}
          onClick={() => setActiveLink(anchor)}
        />
      ))}
    </div>
  )
}

type AnchorNavItemProps = {
  title: string
  href: string
  isActive: boolean
  onClick: () => void
}

function AnchorNavItem({ title, href, isActive, onClick }: AnchorNavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'line-clamp-1 text-textSecondary',
        isActive && 'text-textPrimary',
        'transition duration-300 hover:text-textPrimary',
      )}
    >
      {title}
    </a>
  )
}
