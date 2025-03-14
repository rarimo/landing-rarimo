import { motion } from 'framer-motion'
import {
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { SwiperRef, SwiperSlide } from 'swiper/react'

import { backersList, communitiesList } from '@/assets/data'
import ArrowLeftSLineIcon from '@/assets/icons/arrow-left-s-line-icon.svg'
import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { AppSwiper } from '@/common/AppSwiper'
import ClientOnly from '@/common/ClientOnly'
import SliderMotionCard from '@/common/SliderMotionCard'
import SpotlightCard from '@/common/SpotlightCard'
import { Anchors } from '@/enums'
import { isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiContainer, UiIconButton } from '@/ui'

enum TestimonialTabs {
  Community = 'community',
  Backers = 'backers',
}

export default function CommunitySection() {
  const isMdDown = isMediumScreen()

  const swiperRef = useRef<SwiperRef | null>(null)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTab, setActiveTab] = useState(TestimonialTabs.Community)

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

  useEffect(() => {
    if (!swiperRef.current) return
    swiperRef.current.swiper.slideTo(0)
  }, [activeTab])

  return (
    <UiContainer
      id={Anchors.Community}
      className={cn(
        'relative flex flex-col overflow-hidden bg-backgroundContainer py-12',
        'md:py-[72px]',
      )}
      isFullHeight={false}
      showGradientDecor
      gradientDecorClassName={cn(
        'right-[95px] -bottom-[210px] rotate-[70deg] h-[670px] w-[323px] opacity-80',
      )}
      data-aos='fade-up'
    >
      <div
        className={cn(
          'z-10 mb-[72px] mt-auto flex items-center gap-5 px-8',
          'md:px-[72px]',
        )}
      >
        <TestimonialsTabButton
          isActive={activeTab === TestimonialTabs.Community}
          onClick={() => setActiveTab(TestimonialTabs.Community)}
        >
          Community
        </TestimonialsTabButton>

        <TestimonialsTabButton
          isActive={activeTab === TestimonialTabs.Backers}
          onClick={() => setActiveTab(TestimonialTabs.Backers)}
        >
          Backers
        </TestimonialsTabButton>

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
        slidesOffsetBefore={isMdDown ? 32 : 64}
        slidesOffsetAfter={isMdDown ? 32 : 64}
        onReachEnd={() => setIsLastSlide(true)}
        onFromEdge={() => setIsLastSlide(false)}
        onSlideChange={() => {
          if (!swiperRef.current) return
          setActiveSlide(swiperRef.current.swiper.activeIndex)
        }}
      >
        {activeTab === TestimonialTabs.Community
          ? communitiesList.map((community, idx) => (
              <SwiperSlide className='w-fit' key={idx}>
                <CommunitySliderCard {...community} idx={idx} />
              </SwiperSlide>
            ))
          : backersList.map((backer, idx) => (
              <SwiperSlide className='w-fit' key={idx}>
                <BackersSliderCard {...backer} idx={idx} />
              </SwiperSlide>
            ))}
      </AppSwiper>
    </UiContainer>
  )
}

function TestimonialsTabButton({
  children,
  isDisabled,
  isActive,
  className,
  ...rest
}: {
  isDisabled?: boolean
  isActive?: boolean
} & HTMLAttributes<HTMLButtonElement> &
  PropsWithChildren) {
  return (
    <ClientOnly>
      {() => (
        <button
          {...rest}
          disabled={isDisabled}
          className={cn('flex items-center justify-center', className)}
        >
          <div className='relative flex flex-col gap-0.5'>
            <span
              className={cn(
                'transition duration-300 typography-h3',
                'md:typography-h2',
                isActive ? 'text-secondary' : 'text-textSecondary',
              )}
            >
              {children}
            </span>
            {isActive && (
              <motion.div
                layoutId='underline'
                className='gradient1 absolute -bottom-2 h-0.5 w-full border-t-0'
              />
            )}
          </div>
        </button>
      )}
    </ClientOnly>
  )
}

function CommunitySliderCard({
  imageUrl,
  name,
  position,
  description,
  className,
  idx,
  ...rest
}: {
  imageUrl: string
  name: string
  position: string
  description: string
  idx: number
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <SliderMotionCard idx={idx}>
      <SpotlightCard className='h-[260px] p-6' {...rest}>
        <div className={cn('flex w-[272px] flex-col gap-6', className)}>
          <div className='flex items-center gap-4'>
            <img className='mb-auto size-12' src={imageUrl} alt={name} />
            <div className='flex flex-1 flex-col gap-1'>
              <span className='text-textPrimary typography-overline1'>
                {name}
              </span>
              <span className='text-textSecondary typography-body4'>
                {position}
              </span>
            </div>
          </div>
          <span className='line-clamp-[8] text-textSecondary typography-body3'>
            {description}
          </span>
        </div>
      </SpotlightCard>
    </SliderMotionCard>
  )
}

function BackersSliderCard({
  image,
  title,
  width,
  height,
  className,
  idx,
  ...rest
}: {
  image: string
  title: string
  width: number
  height: number
  idx: number
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <SliderMotionCard idx={idx}>
      <SpotlightCard
        {...rest}
        className={cn(
          'flex flex-col justify-between p-6',
          'relative h-[280px] w-[272px] rounded-[20px] bg-additionalOpacited backdrop-blur-[24px]',
          'md:h-[260px] md:w-[320px]',
          className,
        )}
      >
        <img width={width} height={height} src={image} alt={title} />
        <span className='typography-subtitle3'>{title}</span>
      </SpotlightCard>
    </SliderMotionCard>
  )
}
