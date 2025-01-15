import { forwardRef, ReactNode } from 'react'
import { Mousewheel } from 'swiper/modules'
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
          modules={[Mousewheel]}
          slidesPerView='auto'
          slidesOffsetBefore={slidesOffsetBefore}
          slidesOffsetAfter={slidesOffsetAfter}
          mousewheel={{ forceToAxis: true }}
          spaceBetween={spaceBetween}
          resistanceRatio={0.5}
          grabCursor
          freeMode
          edgeSwipeDetection
          {...props}
        >
          {children}
        </Swiper>
      </div>
    )
  },
)
