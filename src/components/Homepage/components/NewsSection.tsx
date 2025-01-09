import { HTMLAttributes, useCallback, useRef, useState } from 'react'
import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { news } from '@/assets/data/news'
import ArrowLeftSLineIcon from '@/assets/icons/arrow-left-s-line-icon.svg'
import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { cn } from '@/theme/utils'
import { UiContainer, UiIconButton } from '@/ui'

export default function NewsSection() {
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
      className={cn('bg-backgroundContainer p-2')}
      isFullHeight={false}
    >
      <div
        className={cn(
          'flex flex-col gap-12',
          'relative  overflow-hidden rounded-3xl bg-backgroundPure',
          'py-10 md:gap-[72px] md:py-[64px]',
        )}
      >
        <div className='mt-auto flex items-center justify-between gap-5 px-6 md:px-[64px]'>
          <span className='text-textPrimary typography-h3 md:typography-h2'>
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
            {news.map((newsItem, idx) => (
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
          'relative h-[260px] w-[320px] rounded-[20px] backdrop-blur-[24px]',
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
