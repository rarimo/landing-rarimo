import { HTMLAttributes, useCallback, useRef, useState } from 'react'
import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { communities } from '@/assets/data/communities'
import ArrowLeftSLineIcon from '@/assets/icons/arrow-left-s-line-icon.svg'
import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'
import { UiContainer, UiIconButton } from '@/ui'

export default function CommunitySection() {
  const swiperRef = useRef<SwiperRef | null>(null)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  const handlePrevSlide = useCallback(() => {
    swiperRef.current?.swiper.slidePrev()
  }, [swiperRef])

  const handleNextSlide = useCallback(() => {
    swiperRef.current?.swiper.slideNext()
  }, [swiperRef])

  return (
    <UiContainer
      id={Anchors.Community}
      className={cn(
        'relative flex flex-col overflow-hidden bg-backgroundContainer py-12 md:py-[72px]',
        'bg-[url(/images/sharped-blurred-bg-2.png)] bg-[length:680px_570px] bg-right-bottom bg-no-repeat',
      )}
      isFullHeight={false}
    >
      <div className='mb-[72px] mt-auto flex items-center gap-5 px-8 md:px-[72px]'>
        <span
          className={cn('text-textPrimary typography-h3', 'md:typography-h2')}
        >
          Community
        </span>
        <span
          className={cn('text-textSecondary typography-h3', 'md:typography-h2')}
        >
          Backers
        </span>

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
          slidesOffsetBefore={64}
          slidesOffsetAfter={64}
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
          {communities.map((communityBacker, idx) => (
            <SwiperSlide className='w-fit' key={idx}>
              <CommunitySliderCard key={idx} {...communityBacker} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </UiContainer>
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
