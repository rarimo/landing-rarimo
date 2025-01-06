import { HTMLAttributes } from 'react'

import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import {
  ArrowIconButtonLeft,
  ArrowIconButtonRight,
} from '@/components/Homepage/components/ArrowIconButtons'
import { cn } from '@/theme/utils'
import { UiContainer, UiHorizontalDivider } from '@/ui'

export default function ProjectsSection() {
  return (
    <UiContainer
      className={cn(
        'relative flex flex-col overflow-hidden bg-backgroundContainer p-[72px] px-0',
        'bg-[url(/images/sharped-blurred-bg-2.png)] bg-[length:680px_570px] bg-right-bottom bg-no-repeat',
      )}
      isFullHeight={false}
    >
      <div className='flex-1 px-[72px]'>
        <span className='text-textSecondary typography-h1'>
          Unlocking a new generation of social apps, where users stay{' '}
          <span className='text-textPrimary'>private</span> without losing{' '}
          <span className='text-textPrimary'>historical</span>{' '}
          <span className='text-textPrimary'>actions</span> and{' '}
          <span className='text-textPrimary'>identities</span>
        </span>

        <UiHorizontalDivider
          className={'mb-[40px] mt-[72px] bg-componentPrimary'}
        />
      </div>

      <div className='mb-[40px] mt-auto flex items-center gap-5 px-[72px]'>
        <span className='text-textPrimary typography-subtitle2'>100,000+</span>
        <span className='text-textSecondary typography-subtitle2'>
          Active users
        </span>

        <div className='ml-auto flex items-center gap-4'>
          <ArrowIconButtonLeft isDisabled>
            <ArrowRightSLineIcon className={'rotate-180 text-textDisabled'} />
          </ArrowIconButtonLeft>
          <ArrowIconButtonRight>
            <ArrowRightSLineIcon />
          </ArrowIconButtonRight>
        </div>
      </div>

      <ProjectsSectionCarousel />
    </UiContainer>
  )
}

function ProjectsSectionCarousel() {
  const projects = [
    {
      title: 'RariMe',
      desc: 'Self-recoverable identity and crypto wallet',
      imgUrl: '/images/rarime-icon.png',
    },
    {
      title: 'Freedomtool',
      desc: 'Anonymous voting via passport and ZK proofs',
      imgUrl: '/images/freedomtool-icon.png',
    },
    {
      title: 'Openion',
      desc: 'Opinion markets: The Web3 era of social networks',
      imgUrl: '/images/openion-icon.png',
    },
    {
      title: 'Agora',
      desc: 'Citizen network for idea exchange and debate',
      imgUrl: '/images/agora-icon.png',
    },

    {
      title: 'RariMe',
      desc: 'Self-recoverable identity and crypto wallet',
      imgUrl: '/images/rarime-icon.png',
    },
    {
      title: 'Freedomtool',
      desc: 'Anonymous voting via passport and ZK proofs',
      imgUrl: '/images/freedomtool-icon.png',
    },
    {
      title: 'Openion',
      desc: 'Opinion markets: The Web3 era of social networks',
      imgUrl: '/images/openion-icon.png',
    },
    {
      title: 'Agora',
      desc: 'Citizen network for idea exchange and debate',
      imgUrl: '/images/agora-icon.png',
    },
    {
      title: 'RariMe',
      desc: 'Self-recoverable identity and crypto wallet',
      imgUrl: '/images/rarime-icon.png',
    },
    {
      title: 'Freedomtool',
      desc: 'Anonymous voting via passport and ZK proofs',
      imgUrl: '/images/freedomtool-icon.png',
    },
    {
      title: 'Openion',
      desc: 'Opinion markets: The Web3 era of social networks',
      imgUrl: '/images/openion-icon.png',
    },
    {
      title: 'Agora',
      desc: 'Citizen network for idea exchange and debate',
      imgUrl: '/images/agora-icon.png',
    },
  ]

  return (
    <div className='relative h-[215px] w-full max-w-full overflow-auto'>
      <div className={'absolute flex gap-4 px-[72px]'}>
        {projects.map((el, idx) => {
          return (
            <ProjectsSectionProjectCard
              key={idx}
              title={el.title}
              desc={el.desc}
              imgUrl={el.imgUrl}
            />
          )
        })}
      </div>
    </div>
  )
}

function ProjectsSectionProjectCard({
  imgUrl,
  title,
  desc,
  className,
  ...rest
}: {
  imgUrl: string
  title: string
  desc: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col',
        'relative h-[215px] w-[275px] rounded-[20px] bg-additionalOpacited backdrop-blur-[24px]',
        'p-6',
        className,
      )}
    >
      <img className='mb-auto size-12' src={imgUrl} alt={title} />

      <span className='text-textPrimary typography-h4'>{title}</span>
      <span className='mt-2 text-textSecondary typography-body3'>{desc}</span>
    </div>
  )
}
