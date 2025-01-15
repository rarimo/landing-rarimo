import { HTMLAttributes, useCallback, useRef, useState } from 'react'
import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { projectsList } from '@/assets/data'
import ArrowLeftSLineIcon from '@/assets/icons/arrow-left-s-line-icon.svg'
import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import UnderlineIcon from '@/assets/icons/underline-icon.svg'
import { isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiContainer, UiHorizontalDivider, UiIconButton } from '@/ui'

export default function ProjectsSection() {
  const swiperRef = useRef<SwiperRef | null>(null)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const isMdDown = isMediumScreen()

  const handlePrevSlide = useCallback(() => {
    swiperRef.current?.swiper.slidePrev()
  }, [swiperRef])

  const handleNextSlide = useCallback(() => {
    swiperRef.current?.swiper.slideNext()
  }, [swiperRef])

  return (
    <UiContainer
      className={cn(
        'relative flex flex-col overflow-hidden bg-backgroundContainer',
        'p-12 px-0 md:p-[72px] md:px-0',
        'relative overflow-hidden',
      )}
      isFullHeight={false}
      showGradientDecor
      gradientDecorClassName={cn(
        '-right-[35px] -bottom-[270px] rotate-[60deg] h-[715px] w-[407px] opacity-80',
      )}
      data-aos='fade-up'
    >
      <div className={cn('z-10 flex-1 px-8', 'md:px-[72px]')}>
        <div className={cn('max-w-full', 'md:max-w-[85%]')}>
          <span
            className={cn(
              'text-textSecondary typography-h2',
              'md:typography-h1',
            )}
          >
            Unlocking a new generation of social apps, where users stay{' '}
            <span className='text-textPrimary'>private</span> without losing{' '}
            <span className='text-textPrimary'>historical</span>{' '}
            <span className='text-textPrimary'>actions</span> and{' '}
            <span className='text-textPrimary'>identities</span>
          </span>
        </div>

        <UiHorizontalDivider
          className={cn('mb-10 mt-12 bg-componentPrimary', 'md:mt-[72px]')}
        />
      </div>

      <div
        className={cn(
          'z-10 mb-10 mt-auto flex items-center gap-5 px-8',
          'md:px-[72px]',
        )}
      >
        <div className='relative'>
          <span
            className={cn('text-textPrimary typography-h3', 'md:typography-h2')}
          >
            100,000+
          </span>
          <UnderlineIcon className='absolute left-1/2 top-full w-full -translate-x-1/2' />
        </div>
        <span
          className={cn(
            'text-textSecondary typography-subtitle3',
            'md:typography-subtitle2',
          )}
        >
          Active users
        </span>

        <div className={cn('ml-auto hidden items-center gap-4', 'md:flex')}>
          <UiIconButton
            size='large'
            color='white'
            disabled={activeSlide === 0}
            onClick={handlePrevSlide}
          >
            <ArrowLeftSLineIcon />
          </UiIconButton>
          <UiIconButton
            size='large'
            color='white'
            disabled={isLastSlide}
            onClick={handleNextSlide}
          >
            <ArrowRightSLineIcon />
          </UiIconButton>
        </div>
      </div>

      <div>
        <Swiper
          ref={swiperRef}
          modules={[Mousewheel]}
          slidesPerView='auto'
          slidesOffsetBefore={isMdDown ? 32 : 72}
          slidesOffsetAfter={isMdDown ? 32 : 72}
          mousewheel={{ forceToAxis: true }}
          spaceBetween={16}
          resistanceRatio={0.5}
          grabCursor
          freeMode
          edgeSwipeDetection
          onSlideChange={() => {
            if (!swiperRef.current) return
            setIsLastSlide(swiperRef.current.swiper.isEnd)
            setActiveSlide(swiperRef.current.swiper.activeIndex)
          }}
        >
          {projectsList.map((project, idx) => (
            <SwiperSlide className='w-fit' key={idx}>
              <ProjectSliderCard {...project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </UiContainer>
  )
}

function ProjectSliderCard({
  imageUrl,
  title,
  description,
  className,
  ...rest
}: {
  imageUrl: string
  title: string
  description: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col p-6',
        'relative h-[215px] w-[275px] rounded-[20px]',
        'bg-additionalOpacited backdrop-blur-[24px]',
        className,
      )}
    >
      <img className='mb-auto size-12' src={imageUrl} alt={title} />
      <span className='text-textPrimary typography-h4'>{title}</span>
      <span className='mt-2 text-textSecondary typography-body3'>
        {description}
      </span>
    </div>
  )
}
