import {
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { backers } from '@/assets/data/backers'
import { communities } from '@/assets/data/communities'
import ArrowLeftSLineIcon from '@/assets/icons/arrow-left-s-line-icon.svg'
import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { Anchors } from '@/enums'
import { isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiContainer, UiIconButton } from '@/ui'
import UiGradientDecor from '@/ui/UiGradientDecor'

enum TestimonialTabs {
  Community = 'community',
  Backers = 'backers',
}

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperRef | null>(null)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTab, setActiveTab] = useState(TestimonialTabs.Community)
  const isMdDown = isMediumScreen()

  const handlePrevSlide = useCallback(() => {
    swiperRef.current?.swiper.slidePrev()
  }, [swiperRef])

  const handleNextSlide = useCallback(() => {
    swiperRef.current?.swiper.slideNext()
  }, [swiperRef])

  useEffect(() => {
    if (!swiperRef.current) return
    swiperRef.current.swiper.slideTo(0)
  }, [activeTab])

  return (
    <UiContainer
      id={Anchors.Testimonials}
      className={cn(
        'relative flex flex-col overflow-hidden bg-backgroundContainer py-12 md:py-[72px]',
      )}
      isFullHeight={false}
    >
      <UiGradientDecor gradientClassName='right-[95px] -bottom-[210px] rotate-[70deg] h-[670px] w-[323px] opacity-80' />
      <div className='z-10 mb-[72px] mt-auto flex items-center gap-5 px-8 md:px-[72px]'>
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
            disabled={activeSlide === 0}
            onClick={handlePrevSlide}
          >
            <ArrowLeftSLineIcon />
          </UiIconButton>
          <UiIconButton
            size='large'
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
          {activeTab === TestimonialTabs.Community
            ? communities.map((community, idx) => (
                <SwiperSlide className='w-fit' key={idx}>
                  <CommunitySliderCard {...community} />
                </SwiperSlide>
              ))
            : backers.map((backer, idx) => (
                <SwiperSlide className='w-fit' key={idx}>
                  <BackersSliderCard {...backer} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
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
    <button
      {...rest}
      disabled={isDisabled}
      className={cn('flex items-center justify-center', className)}
    >
      <span
        className={cn(
          'typography-h3',
          'md:typography-h2',
          isActive ? 'text-secondary' : 'text-textSecondary',
        )}
      >
        {children}
      </span>
    </button>
  )
}

function CommunitySliderCard({
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
        'flex flex-col gap-6',
        'relative h-[260px] w-[320px] rounded-[20px] bg-additionalOpacited backdrop-blur-[24px]',
        'p-6',
        className,
      )}
    >
      <div className='flex items-center gap-4'>
        <img className='mb-auto size-12' src={imgUrl} alt={name} />
        <div className='flex flex-1 flex-col gap-1'>
          <span className='text-textPrimary typography-overline1'>{name}</span>
          <span className='text-textSecondary typography-body4'>
            {position}
          </span>
        </div>
      </div>

      <span className='text-textSecondary typography-body3'>{desc}</span>
    </div>
  )
}

function BackersSliderCard({
  image,
  title,
  width,
  height,
  className,
  ...rest
}: {
  image: string
  title: string
  width: number
  height: number
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col justify-between',
        'relative h-[260px] w-[320px] rounded-[20px] bg-additionalOpacited backdrop-blur-[24px]',
        'p-6',
        className,
      )}
    >
      <img width={width} height={height} src={image} alt={title} />
      <span className='typography-subtitle3'>{title}</span>
    </div>
  )
}
