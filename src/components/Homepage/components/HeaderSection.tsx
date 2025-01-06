'use client'

import { useClickAway } from '@uidotdev/usehooks'
import Link from 'next/link'
import { ForwardedRef, useEffect, useMemo, useState } from 'react'

import LogoIcon from '@/assets/icons/logo-icon.svg'
import MenuIcon from '@/assets/icons/menu-icon.svg'
import { Anchors } from '@/enums'
import { useTranslation } from '@/hooks/useTranslation'
import { locales } from '@/i18n'
import { cn } from '@/theme/utils'
import { CircledBadge, Container, UiCollapse } from '@/ui'

export default function HeaderSection({
  activeLink = Anchors.Hero,
  setActiveLink,
}: {
  activeLink?: Anchors
  setActiveLink: (link: Anchors) => void
}) {
  const { t, lang } = useTranslation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const langSwitcherComponent = useMemo(() => {
    return (
      <Link href={lang === locales[0] ? `/${locales[1]}` : `/`}>
        <span className='text-subtitle4 text-textSecondary'>
          {t('header-section.lang')}
        </span>
      </Link>
    )
  }, [lang, t])

  const menuRef = useClickAway(() => {
    setIsMenuOpen(false)
  })

  useEffect(() => {
    setIsMenuOpen(false)
  }, [activeLink])

  return (
    <header className='sticky top-0 z-10 bg-backgroundPrimary py-8 sm:relative'>
      <Container
        className='flex items-center justify-between gap-8 sm:flex-row'
        data-aos='fade-up'
      >
        <div className="className='max-w-[105px] sm:max-w-[186px]'">
          <LogoIcon />
        </div>

        <AnchorsList
          className='mx-auto hidden md:flex'
          activeLink={activeLink}
          setActiveLink={link => {
            setActiveLink(link)
          }}
        />
        <div
          ref={menuRef as ForwardedRef<HTMLDivElement>}
          className='relative order-3 flex flex-row items-center gap-4 md:order-2'
        >
          <div className='block md:hidden'>{langSwitcherComponent}</div>

          <button
            className='flex md:hidden'
            onClick={() => {
              setIsMenuOpen(prev => !prev)
            }}
          >
            <CircledBadge className='size-10'>
              <MenuIcon className='size-5' />
            </CircledBadge>
          </button>

          <UiCollapse
            className='absolute right-0 top-[150%] z-10'
            isOpen={isMenuOpen}
          >
            <AnchorsList
              className='flex-col items-end gap-12 rounded-lg bg-baseWhite p-4 text-right'
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          </UiCollapse>
        </div>

        <div className='hidden md:block'>{langSwitcherComponent}</div>
      </Container>
    </header>
  )
}

function AnchorsList({
  className,
  activeLink,
  setActiveLink,
}: {
  className?: string
  activeLink: Anchors
  setActiveLink: (link: Anchors) => void
}) {
  const { t } = useTranslation()

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <AnchorNavItem
        title={t('header-section.anchors-hero')}
        href={`#${Anchors.Hero}`}
        isActive={activeLink === Anchors.Hero}
        onClick={() => setActiveLink(Anchors.Hero)}
      />
      <AnchorNavItem
        title={t('header-section.anchors-description')}
        href={`#${Anchors.Description}`}
        isActive={activeLink === Anchors.Description}
        onClick={() => setActiveLink(Anchors.Description)}
      />
      <AnchorNavItem
        title={t('header-section.anchors-abilities')}
        href={`#${Anchors.Abilities}`}
        isActive={activeLink === Anchors.Abilities}
        onClick={() => setActiveLink(Anchors.Abilities)}
      />
      <AnchorNavItem
        title={t('header-section.anchors-safety')}
        href={`#${Anchors.Safety}`}
        isActive={activeLink === Anchors.Safety}
        onClick={() => setActiveLink(Anchors.Safety)}
      />
      {/*<AnchorNavItem*/}
      {/*  title='მისია'*/}
      {/*  href={`#${Anchors.Purpose}`}*/}
      {/*  isActive={activeLink === Anchors.Purpose}*/}
      {/*  onClick={() => setActiveLink(Anchors.Purpose)}*/}
      {/*/>*/}
    </div>
  )
}

function AnchorNavItem({
  title,
  href,
  isActive,
  className,
  onClick,
}: {
  title: string
  href: string
  isActive: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      className={cn(
        'relative whitespace-nowrap transition-all',
        'text-subtitle4 text-textSecondary',
        isActive && 'text-primaryMain',
        className,
      )}
      onClick={onClick}
    >
      {title}

      <span
        className={cn(
          'absolute left-1/2 top-[135%] h-[1px] w-0 -translate-x-1/2 bg-primaryMain transition-all',
          isActive && 'w-[50%]',
        )}
      />
    </Link>
  )
}
