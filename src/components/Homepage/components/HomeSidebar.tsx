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

        <UiHorizontalDivider className={'my-5 bg-red-600'} />

        <div className='flex flex-col gap-5'>
          <ExtIconLink href={'#'}>Learning hub</ExtIconLink>
          <ExtIconLink href={'#'}>Documentation</ExtIconLink>
        </div>

        <div className='mt-auto h-[150px] w-full bg-red-600'></div>
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
        href={`#${Anchors.Description}`}
        isActive={activeLink === Anchors.Description}
        onClick={() => setActiveLink(Anchors.Description)}
      />
      <AnchorNavItem
        title='L2: ZK Registries'
        href={`#${Anchors.Abilities}`}
        isActive={activeLink === Anchors.Abilities}
        onClick={() => setActiveLink(Anchors.Abilities)}
      />
      <AnchorNavItem
        title='Community'
        href={`#${Anchors.Safety}`}
        isActive={activeLink === Anchors.Safety}
        onClick={() => setActiveLink(Anchors.Safety)}
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
        'text-text-primary line-clamp-1 text-sm font-semibold',
        isActive && 'text-accent-primary',
      )}
    >
      {title}
    </a>
  )
}
