import { forwardRef, ReactNode } from 'react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperRef } from 'swiper/react'

export interface AppSwiperProps extends SwiperProps {
  children: ReactNode
}

export const AppSwiper = forwardRef<SwiperRef, AppSwiperProps>(
  (
    {
      children,
      slidesOffsetBefore = 24,
      slidesOffsetAfter = 24,
      spaceBetween = 16,
      ...props
    },
    ref,
  ) => {
    return (
      <div>
        <Swiper
          ref={ref}
          modules={[Mousewheel, FreeMode]}
          slidesPerView='auto'
          slidesOffsetBefore={slidesOffsetBefore}
          slidesOffsetAfter={slidesOffsetAfter}
          mousewheel={{ forceToAxis: true }}
          autoplay={false}
          spaceBetween={spaceBetween}
          resistanceRatio={0.5}
          grabCursor
          freeMode
          edgeSwipeDetection
          {...props}
          className='no-scrollbar md:overflow-x-scroll'
        >
          {children}
        </Swiper>
      </div>
    )
  },
)
