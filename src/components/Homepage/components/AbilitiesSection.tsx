import { HTMLAttributes, PropsWithChildren } from 'react'

import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/theme/utils'
import { Container } from '@/ui'

export default function AbilitiesSection() {
  const { t } = useTranslation()

  return (
    <Container data-aos='fade-up'>
      <span
        className='text-h5 text-textPrimary'
        data-aos='fade-up'
        data-aos-delay='100'
      >
        {t('abilities-section.title')}
      </span>

      <div className='mt-15 flex w-full flex-wrap gap-6 lg:flex-row'>
        <div className='flex w-full flex-col gap-6 lg:flex-row'>
          <AbilityCard
            className='flex-1 flex-row gap-5 lg:flex-[0.6] lg:gap-10'
            data-aos='fade-up'
            data-aos-delay='250'
          >
            <AbilityCardTextContent
              title1={t('abilities-section.ability-card-1.title-1')}
              title2={t('abilities-section.ability-card-1.title-2')}
              subtitle={t('abilities-section.ability-card-1.subtitle')}
            />
            <img
              className='-mb-[75px] -mr-[230px] mt-0 block w-[270px] self-end lg:-mr-[100px] lg:w-[320px]'
              src={t('abilities-section.ability-card-1.image-path')}
              alt='ability-1'
            />
          </AbilityCard>
          <AbilityCard
            className='flex-1 gap-10 lg:flex-[0.4]'
            data-aos='fade-up'
            data-aos-delay='400'
          >
            <AbilityCardTextContent
              title1={t('abilities-section.ability-card-2.title-1')}
              title2={t('abilities-section.ability-card-2.title-2')}
              subtitle={t('abilities-section.ability-card-2.subtitle')}
            />
            <img
              className='mb-20 block w-full self-end lg:mb-0'
              src={t('abilities-section.ability-card-2.image-path')}
              alt='ability-2'
            />
          </AbilityCard>
        </div>
        <div className='flex w-full flex-col gap-6 lg:flex-row'>
          <AbilityCard
            className='flex-[0.4]'
            data-aos='fade-up'
            data-aos-delay='550'
          >
            <AbilityCardTextContent
              title1={t('abilities-section.ability-card-3.title-1')}
              title2={t('abilities-section.ability-card-3.title-2')}
              subtitle={t('abilities-section.ability-card-3.subtitle')}
              className='max-w-[80%]'
            />
            <img
              className='-mb-[30px] -mr-[130px] -mt-[25px] block w-[275px] self-end lg:-mb-[150px] lg:-mr-[150px]'
              src={t('abilities-section.ability-card-3.image-path')}
              alt='ability-3'
            />
          </AbilityCard>
          <AbilityCard
            className='flex-[0.6] gap-10 sm:flex-row'
            data-aos='fade-up'
            data-aos-delay='700'
          >
            <AbilityCardTextContent
              title1={t('abilities-section.ability-card-4.title-1')}
              title2={t('abilities-section.ability-card-4.title-2')}
              subtitle={t('abilities-section.ability-card-4.subtitle')}
            />
            <img
              className='-mb-[550px] -mr-[100px] block w-[300px] self-end sm:-mb-[400px] sm:-mr-[100px]'
              src={t('abilities-section.ability-card-4.image-path')}
              alt='ability-4'
            />
          </AbilityCard>
        </div>
      </div>
    </Container>
  )
}

function AbilityCard({
  className,
  children,
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col overflow-hidden rounded-lg bg-backgroundPrimary p-5 lg:p-10',
        className,
      )}
    >
      {children}
    </div>
  )
}

function AbilityCardTextContent({
  title1,
  title2,
  subtitle,
  className,
}: {
  title1: string
  title2: string
  subtitle: string
  className?: string
}) {
  return (
    <div className={cn('relative flex flex-col gap-4', className)}>
      <div className='flex flex-col'>
        <span className='text-h5 text-primaryMain'>{title1}</span>
        <span className='text-h5 text-textPrimary'>{title2}</span>
      </div>
      <span className='text-body3 text-textSecondary'>{subtitle}</span>
    </div>
  )
}
