import { HTMLAttributes, useCallback, useRef, useState } from 'react'
import { SwiperRef, SwiperSlide } from 'swiper/react'

import { projectsList } from '@/assets/data'
import ArrowLeftSLineIcon from '@/assets/icons/arrow-left-s-line-icon.svg'
import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import ExternalLinkIcon from '@/assets/icons/external-link-icon.svg'
import UnderlineIcon from '@/assets/icons/underline-icon.svg'
import { AppSwiper } from '@/common/AppSwiper'
import CountUp from '@/common/CountUp'
import ScrollReveal from '@/common/ScrollReveal'
import SliderMotionCard from '@/common/SliderMotionCard'
import SpotlightCard from '@/common/SpotlightCard'
import { Anchors } from '@/enums'
import { isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiContainer, UiHorizontalDivider, UiIconButton } from '@/ui'

export default function ProjectsSection() {
  const swiperRef = useRef<SwiperRef | null>(null)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const isMdDown = isMediumScreen()

  const handlePrevSlide = useCallback(() => {
    if (!swiperRef.current) return
    const swiper = swiperRef.current.swiper
    const newIndex = Math.max(swiper.activeIndex - 2, 0)
    swiper.slideTo(newIndex)
  }, [swiperRef])

  const handleNextSlide = useCallback(() => {
    if (!swiperRef.current) return
    const swiper = swiperRef.current.swiper
    const totalSlides = swiper.slides.length
    const newIndex = Math.min(swiper.activeIndex + 2, totalSlides - 1)
    swiper.slideTo(newIndex)
  }, [swiperRef])

  return (
    <UiContainer
      id={Anchors.Ecosystem}
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
    >
      <div className={cn('z-10 flex-1 px-8', 'md:px-[72px]')}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={5}
          containerClassName={cn('max-w-full', 'md:max-w-[85%]')}
          textClassName={cn('text-textSecondary', 'md:typography-h1')}
        >
          Unlocking a new generation of social apps, where users stay
          [private][text-textPrimary] without losing [historical
          actions][text-textPrimary] and [identities][text-textPrimary]
        </ScrollReveal>
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
          <div
            className={cn(
              'text-textPrimary typography-h3 md:typography-h2',
              'inline-block',
              'min-w-[7.2ch]',
            )}
          >
            <CountUp separator=',' duration={0.5} to={100_000} />
            <span
              className={cn(
                'text-textPrimary typography-h3',
                'md:typography-h2',
              )}
            >
              +
            </span>
          </div>
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

      <AppSwiper
        ref={swiperRef}
        slidesOffsetBefore={isMdDown ? 32 : 72}
        slidesOffsetAfter={isMdDown ? 32 : 72}
        onReachEnd={() => setIsLastSlide(true)}
        onFromEdge={() => setIsLastSlide(false)}
        onSlideChange={() => {
          if (!swiperRef.current) return
          setIsLastSlide(swiperRef.current.swiper.isEnd)
          setActiveSlide(swiperRef.current.swiper.activeIndex)
        }}
      >
        {projectsList.map((project, idx) => (
          <SwiperSlide className='w-fit' key={idx}>
            <ProjectSliderCard {...project} idx={idx} />
          </SwiperSlide>
        ))}
      </AppSwiper>
    </UiContainer>
  )
}

function ProjectSliderCard({
  imageUrl,
  title,
  description,
  link,
  className,
  idx,
  ...rest
}: {
  imageUrl: string
  title: string
  description: string
  link: string
  idx: number
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <SliderMotionCard idx={idx}>
      <SpotlightCard className='relative h-[215px] w-[275px] p-6' {...rest}>
        <a href={link} target='_blank' rel='noreferrer noopener'>
          <div
            {...rest}
            className={cn(
              'group flex flex-col',
              'h-full rounded-[20px]',
              className,
            )}
          >
            <img className='mb-auto size-12' src={imageUrl} alt={title} />
            <div className='flex items-center gap-2'>
              <span className='text-textPrimary typography-h4'>{title}</span>
              <ExternalLinkIcon
                className={cn(
                  'text-textSecondary',
                  'opacity-0 transition duration-300',
                  'group-hover:opacity-100',
                )}
              />
            </div>
            <span className='mt-2 text-textSecondary typography-body3'>
              {description}
            </span>
          </div>
        </a>
      </SpotlightCard>
    </SliderMotionCard>
  )
}
