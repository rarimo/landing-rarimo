import { HTMLAttributes, useCallback, useRef, useState } from 'react'
import { SwiperRef, SwiperSlide } from 'swiper/react'

import { newsList } from '@/assets/data'
import ArrowLeftSLineIcon from '@/assets/icons/arrow-left-s-line-icon.svg'
import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { AppSwiper } from '@/common/AppSwiper'
import SliderMotionCard from '@/common/SliderMotionCard'
import { isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiContainer, UiIconButton } from '@/ui'

export default function NewsSection() {
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
      className={cn('bg-backgroundContainer p-2')}
      isFullHeight={false}
      data-aos='fade'
    >
      <div
        className={cn(
          'flex flex-col gap-12',
          'relative overflow-hidden rounded-3xl bg-backgroundPure py-10',
          'md:gap-[72px] md:py-[64px]',
        )}
      >
        <div
          className={cn(
            'mt-auto flex items-center justify-between gap-5 px-6',
            'md:px-16',
          )}
        >
          <span
            className={cn('text-textPrimary typography-h3', 'md:typography-h2')}
          >
            News and blogs
          </span>

          <div className={cn('hidden items-center gap-4', 'md:flex')}>
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

        <AppSwiper
          ref={swiperRef}
          slidesOffsetBefore={isMdDown ? 24 : 64}
          slidesOffsetAfter={isMdDown ? 24 : 64}
          onReachEnd={() => setIsLastSlide(true)}
          onFromEdge={() => setIsLastSlide(false)}
          onSlideChange={() => {
            if (!swiperRef.current) return
            setActiveSlide(swiperRef.current.swiper.activeIndex)
          }}
        >
          {newsList.map((newsItem, idx) => (
            <SwiperSlide className='w-fit' key={idx}>
              <NewsSectionItemCard {...newsItem} idx={idx} />
            </SwiperSlide>
          ))}
        </AppSwiper>
      </div>
    </UiContainer>
  )
}

function NewsSectionItemCard({
  title,
  link,
  image,
  className,
  idx,
  ...rest
}: {
  title: string
  link: string
  image: string
  idx: number
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <SliderMotionCard idx={idx}>
      <a href={link} target='_blank' rel='nofollow noopener noreferrer'>
        <div
          {...rest}
          className={cn(
            'flex flex-col gap-6',
            'relative h-[260px] w-[272px] rounded-[20px] backdrop-blur-[24px]',
            'md:w-[320px]',
            className,
          )}
        >
          <img
            className='aspect-video w-full rounded-lg'
            src={image}
            alt={title}
          />
          <span className='line-clamp-2 text-textPrimary typography-subtitle4'>
            {title}
          </span>
        </div>
      </a>
    </SliderMotionCard>
  )
}
