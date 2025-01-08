import Link from 'next/link'
import type { HTMLAttributes } from 'react'

import DiscordLineIcon from '@/assets/icons/discord-line-icon.svg'
import LogoIcon from '@/assets/icons/logo-icon.svg'
import TelegramLineIcon from '@/assets/icons/telegram-line-icon.svg'
import TwitterXFillIcon from '@/assets/icons/twitter-x-fill-icon.svg'
import ThemeSwitcher from '@/common/ThemeSwitcher'
import { Config } from '@/config'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'
import { ExtIconLink, UiHorizontalDivider } from '@/ui'

type HomeSidebarProps = {
  activeLink: Anchors
  setActiveLink: (link: Anchors) => void
} & HTMLAttributes<HTMLDivElement>

export default function HomeSidebar({
  activeLink,
  setActiveLink,
  className,
  ...rest
}: HomeSidebarProps) {
  return (
    <aside {...rest} className={cn('flex size-full flex-col', className)}>
      <div className='mb-14 max-w-[105px]'>
        <LogoIcon />
      </div>

      <nav className='flex flex-1 flex-col'>
        <AnchorsList
          className=''
          activeLink={activeLink}
          setActiveLink={link => {
            setActiveLink(link)
          }}
        />

        <UiHorizontalDivider className={'my-5 w-3 bg-componentPrimary'} />

        <div className='flex flex-col gap-5'>
          <ExtIconLink
            href={Config.learningHubLink}
            target='_blank'
            className={'text-textSecondary'}
          >
            Learning hub
          </ExtIconLink>
          <ExtIconLink
            href={Config.documentationLink}
            target='_blank'
            className={'text-textSecondary'}
          >
            Documentation
          </ExtIconLink>
        </div>
      </nav>

      <div className='mt-auto flex flex-col gap-6'>
        <div className='flex items-center gap-4'>
          <Link href={Config.xLink} target='_blank'>
            <TwitterXFillIcon className={'text-textSecondary'} />
          </Link>
          <Link href={Config.telegramLink} target='_blank'>
            <TelegramLineIcon className={'text-textSecondary'} />
          </Link>
          <Link href={Config.discordLink} target='_blank'>
            <DiscordLineIcon className={'text-textSecondary'} />
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
  return (
    <div {...rest} className={cn('flex flex-col gap-5', className)}>
      <AnchorNavItem
        title='Home'
        href={`#${Anchors.Home}`}
        isActive={activeLink === Anchors.Home}
        onClick={() => setActiveLink(Anchors.Home)}
      />
      <AnchorNavItem
        title='Ecosystem'
        href={`#${Anchors.Ecosystem}`}
        isActive={activeLink === Anchors.Ecosystem}
        onClick={() => setActiveLink(Anchors.Ecosystem)}
      />
      <AnchorNavItem
        title='L2: ZK Registries'
        href={`#${Anchors.ZkRegistries}`}
        isActive={activeLink === Anchors.ZkRegistries}
        onClick={() => setActiveLink(Anchors.ZkRegistries)}
      />
      <AnchorNavItem
        title='Community'
        href={`#${Anchors.Community}`}
        isActive={activeLink === Anchors.Community}
        onClick={() => setActiveLink(Anchors.Community)}
      />
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
      )}
    >
      {title}
    </a>
  )
}
