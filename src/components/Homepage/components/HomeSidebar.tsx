import type { HTMLAttributes } from 'react'

import LogoIcon from '@/assets/icons/logo-icon.svg'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'
import { UiHorizontalDivider } from '@/ui'

import ExtIconLink from '../../../ui/ExtIconLink'

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
          <ExtIconLink href={'#'} className={'text-textSecondary'}>
            Learning hub
          </ExtIconLink>
          <ExtIconLink href={'#'} className={'text-textSecondary'}>
            Documentation
          </ExtIconLink>
        </div>

        <div className='mt-auto h-[150px] w-full bg-componentPrimary'></div>
      </nav>
    </aside>
  )
}

type AnchorsListProps = {
  activeLink: Anchors
  setActiveLink: (link: Anchors) => void
} & HTMLAttributes<HTMLDivElement>

function AnchorsList({
  activeLink,
  setActiveLink,
  className,
  ...rest
}: AnchorsListProps) {
  return (
    <div {...rest} className={cn('flex flex-col gap-5', className)}>
      <AnchorNavItem
        title='Hero'
        href={`#${Anchors.Hero}`}
        isActive={activeLink === Anchors.Hero}
        onClick={() => setActiveLink(Anchors.Hero)}
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
