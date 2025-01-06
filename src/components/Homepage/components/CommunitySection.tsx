import { HTMLAttributes } from 'react'

import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import {
  ArrowIconButtonLeft,
  ArrowIconButtonRight,
} from '@/components/Homepage/components/ArrowIconButtons'
import { cn } from '@/theme/utils'
import { UiContainer } from '@/ui'

export default function CommunitySection() {
  return (
    <UiContainer
      className={cn(
        'relative flex flex-col overflow-hidden bg-backgroundContainer py-[72px]',
        'bg-[url(/images/sharped-blurred-bg-2.png)] bg-[length:680px_570px] bg-right-bottom bg-no-repeat',
      )}
      isFullHeight={false}
    >
      <div className='mb-[72px] mt-auto flex items-center gap-5 px-[72px]'>
        <span className='text-textPrimary typography-h2'>Community</span>
        <span className='text-textSecondary typography-h2'>Backers</span>

        <div className='ml-auto flex items-center gap-4'>
          <ArrowIconButtonLeft isDisabled>
            <ArrowRightSLineIcon className={'rotate-180 text-textDisabled'} />
          </ArrowIconButtonLeft>
          <ArrowIconButtonRight>
            <ArrowRightSLineIcon />
          </ArrowIconButtonRight>
        </div>
      </div>

      <CommunitySectionCarousel />
    </UiContainer>
  )
}

function CommunitySectionCarousel() {
  const community = [
    {
      name: 'Vitalik Buterin',
      position: 'Ethereum Co-Founder',
      imgUrl: '/images/community-buterin.png',
      desc: 'Zero-knowledge cryptography holds tremendous potential for solving digital identity. I’m proud to support the Rarimo team as they tackle this critical need with innovative products like Freedom Tool and the ZK Identity Registry. ',
    },
    {
      name: 'Brian Retford',
      position: 'RiscZero Co-Founder',
      imgUrl: '/images/community-george.png',
      desc: 'It’s more important today than it ever has been that there be open, decentralized and transparent identity protocol that enables credible anonymous and pseudonymous online actions. Rarimo is building this and I’m proud to support them',
    },
    {
      name: 'Stefan George',
      position: 'Gnosis Co-Founder',
      imgUrl: '/images/community-retford.png',
      desc: 'The Rarimo team has proven to apply ZK technologies to solve real world problems successfully while protecting user privacy. I am exited to see their solutions like zkPassport being applied on a global scale.',
    },

    {
      name: 'Vitalik Buterin',
      position: 'Ethereum Co-Founder',
      imgUrl: '/images/community-buterin.png',
      desc: 'Zero-knowledge cryptography holds tremendous potential for solving digital identity. I’m proud to support the Rarimo team as they tackle this critical need with innovative products like Freedom Tool and the ZK Identity Registry. ',
    },
    {
      name: 'Brian Retford',
      position: 'RiscZero Co-Founder',
      imgUrl: '/images/community-george.png',
      desc: 'It’s more important today than it ever has been that there be open, decentralized and transparent identity protocol that enables credible anonymous and pseudonymous online actions. Rarimo is building this and I’m proud to support them',
    },
    {
      name: 'Stefan George',
      position: 'Gnosis Co-Founder',
      imgUrl: '/images/community-retford.png',
      desc: 'The Rarimo team has proven to apply ZK technologies to solve real world problems successfully while protecting user privacy. I am exited to see their solutions like zkPassport being applied on a global scale.',
    },
    {
      name: 'Vitalik Buterin',
      position: 'Ethereum Co-Founder',
      imgUrl: '/images/community-buterin.png',
      desc: 'Zero-knowledge cryptography holds tremendous potential for solving digital identity. I’m proud to support the Rarimo team as they tackle this critical need with innovative products like Freedom Tool and the ZK Identity Registry. ',
    },
    {
      name: 'Brian Retford',
      position: 'RiscZero Co-Founder',
      imgUrl: '/images/community-george.png',
      desc: 'It’s more important today than it ever has been that there be open, decentralized and transparent identity protocol that enables credible anonymous and pseudonymous online actions. Rarimo is building this and I’m proud to support them',
    },
    {
      name: 'Stefan George',
      position: 'Gnosis Co-Founder',
      imgUrl: '/images/community-retford.png',
      desc: 'The Rarimo team has proven to apply ZK technologies to solve real world problems successfully while protecting user privacy. I am exited to see their solutions like zkPassport being applied on a global scale.',
    },
  ]

  return (
    <div className='relative h-[260px] w-full max-w-full overflow-auto'>
      <div className={'absolute flex gap-4 px-[72px]'}>
        {community.map((el, idx) => {
          return (
            <CommunitySectionItemCard
              key={idx}
              name={el.name}
              position={el.position}
              desc={el.desc}
              imgUrl={el.imgUrl}
            />
          )
        })}
      </div>
    </div>
  )
}

function CommunitySectionItemCard({
  imgUrl,
  name,
  position,
  desc,
  className,
  ...rest
}: {
  imgUrl: string
  name: string
  position: string
  desc: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col',
        'relative h-[260px] w-[320px] rounded-[20px] bg-additionalOpacited backdrop-blur-[24px]',
        'p-6',
        className,
      )}
    >
      <div className='flex items-center gap-4'>
        <img className='mb-auto size-12' src={imgUrl} alt={name} />
        <div className='flex flex-1 flex-col gap-1'>
          <span className='text-textPrimary typography-body3'>{name}</span>
          <span className='text-textSecondary typography-body4'>
            {position}
          </span>
        </div>
      </div>

      <span className='mt-2 text-textSecondary typography-body3'>{desc}</span>
    </div>
  )
}
