import { HTMLAttributes, useCallback, useRef, useState } from 'react'
import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { newsList } from '@/assets/data'
import ArrowLeftSLineIcon from '@/assets/icons/arrow-left-s-line-icon.svg'
import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiContainer, UiIconButton } from '@/ui'

export default function NewsSection() {
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
      className={cn('bg-backgroundContainer p-2')}
      isFullHeight={false}
      data-aos='fade-up'
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

        <div>
          <Swiper
            ref={swiperRef}
            modules={[Mousewheel]}
            slidesPerView='auto'
            slidesOffsetBefore={isMdDown ? 24 : 64}
            slidesOffsetAfter={isMdDown ? 24 : 64}
            mousewheel={{ forceToAxis: true }}
            spaceBetween={16}
            resistanceRatio={0.5}
            grabCursor
            freeMode
            edgeSwipeDetection
            onReachEnd={() => setIsLastSlide(true)}
            onFromEdge={() => setIsLastSlide(false)}
            onSlideChange={() => {
              if (!swiperRef.current) return
              setActiveSlide(swiperRef.current.swiper.activeIndex)
            }}
          >
            {newsList.map((newsItem, idx) => (
              <SwiperSlide className='w-fit' key={idx}>
                <NewsSectionItemCard {...newsItem} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </UiContainer>
  )
}

function NewsSectionItemCard({
  title,
  link,
  image,
  className,
  ...rest
}: {
  title: string
  link: string
  image: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
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
  )
}
