'use client'

import { PropsWithChildren, useState } from 'react'

import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/theme/utils'
import { CircledBadge, Container, UiCollapse } from '@/ui'

export default function SafetySection() {
  const { t } = useTranslation()

  return (
    <Container className='flex flex-col gap-15' data-aos='fade-up'>
      <span
        className='text-h5 text-textPrimary'
        data-aos='fade-up'
        data-aos-delay='100'
      >
        {t('safety-section.title')}
      </span>

      <div
        className='flex flex-col gap-14 rounded-lg bg-backgroundPrimary p-8 md:flex-row'
        data-aos='fade-up'
        data-aos-delay='300'
      >
        <div className='order-2 flex flex-1 flex-col gap-7 md:order-1 '>
          <Accordion
            isOpenByDefault={true}
            title={t('safety-section.accordion-1.title')}
          >
            <p className='text-body3 text-textPrimary'>
              {t('safety-section.accordion-1.description')}
            </p>
          </Accordion>
          {/*<HorizontalDivider />*/}
          <Accordion title={t('safety-section.accordion-2.title')}>
            <p className='text-body3 text-textPrimary'>
              {t('safety-section.accordion-2.description')}{' '}
              <a
                className='text-primaryMain underline'
                href='https://freedomtool.org/#/doc'
                target='_blank'
                rel='noreferrer'
              >
                {t('safety-section.accordion-2.link')}
              </a>
            </p>
          </Accordion>
          {/*<HorizontalDivider />*/}
          <Accordion title={t('safety-section.accordion-3.title')}>
            <p className='text-body3 text-textPrimary'>
              {t('safety-section.accordion-3.description')}{' '}
              <a
                className='text-primaryMain underline'
                href='https://freedomtool.org/#/doc'
                target='_blank'
                rel='noreferrer'
              >
                {t('safety-section.accordion-3.link')}
              </a>
            </p>
          </Accordion>
        </div>

        <img
          className='order-1 h-auto w-full rounded-md object-cover md:order-2 md:max-w-[420px]'
          src='/images/home/safety.png'
          alt='safety'
        />
      </div>
    </Container>
  )
}

function Accordion({
  title,
  children,
  isOpenByDefault = false,
}: {
  isOpenByDefault?: boolean
  title: string
} & PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault)

  return (
    <div className='flex flex-col'>
      <button
        className='flex cursor-pointer items-center justify-start gap-4'
        onClick={() => setIsOpen(prev => !prev)}
      >
        <CircledBadge
          className={cn(isOpen && 'rotate-180 bg-primaryMain text-baseWhite')}
        >
          {/*<CaretDown />*/}
        </CircledBadge>
        <span
          className={cn(
            'flex-1 text-left text-subtitle2 text-textSecondary',
            isOpen && 'text-primaryMain',
          )}
        >
          {title}
        </span>
      </button>
      <UiCollapse isOpen={isOpen}>
        <div className='pt-6'>{children}</div>
      </UiCollapse>
    </div>
  )
}
