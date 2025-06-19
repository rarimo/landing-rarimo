import Link from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react'

import GithubFillIcon from '@/assets/icons/github-fill-icon.svg'
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
          <NavItem
            href={'/learning-hub'}
            title={'Learning hub'}
            isActive={false}
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
        <div className='flex items-center gap-3'>
          <Link href={config.xLink} target='_blank' className={linkStyle}>
            <TwitterXFillIcon className='w-5' />
          </Link>
          <Link
            href={config.telegramLink}
            target='_blank'
            className={linkStyle}
          >
            <TelegramLineIcon className='w-5' />
          </Link>
          <Link href={config.githubLink} target='_blank' className={linkStyle}>
            <GithubFillIcon className='w-5' />
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

export type AnchorsListProps = {
  activeLink?: Anchors
  setActiveLink?: (link: Anchors) => void
} & HTMLAttributes<HTMLDivElement>

export function AnchorsList({
  activeLink,
  setActiveLink,
  className,
  ...rest
}: AnchorsListProps) {
  const sectionAnchors = [
    { title: 'Home', anchor: Anchors.Home },
    { title: 'zk-Image recognition', anchor: Anchors.ZkImage },
    { title: 'zk Passport', anchor: Anchors.ZkPassport },
    { title: 'Ecosystem', anchor: Anchors.Ecosystem },
    { title: 'Community', anchor: Anchors.Community },
  ]

  return (
    <div {...rest} className={cn('flex flex-col gap-5', className)}>
      {sectionAnchors.map(({ title, anchor }) => (
        <AnchorNavItem
          key={anchor}
          title={title}
          href={`/#${anchor}`}
          isActive={activeLink === anchor}
          onClick={() => setActiveLink?.(anchor)}
        />
      ))}
    </div>
  )
}

type AnchorNavItemProps = {
  onClick: () => void
} & NavItemProps

export function AnchorNavItem({
  title,
  href,
  isActive,
  onClick,
}: AnchorNavItemProps) {
  return (
    <NavItem href={href} title={title} onClick={onClick} isActive={isActive} />
  )
}

type NavItemProps = {
  title: string
  href: string
  isActive: boolean
} & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export function NavItem({ title, href, isActive, ...rest }: NavItemProps) {
  return (
    <a
      {...rest}
      href={href}
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
