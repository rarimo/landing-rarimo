import { UiContainer } from '@/ui'

export default function RewardsSection() {
  return (
    <UiContainer
      className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6'
      data-aos='fade-up'
    >
      <div className='bg-background-component relative flex flex-col gap-6 rounded-lg p-6 lg:h-[410px] lg:gap-0 lg:rounded-xl lg:p-8'>
        <h3 className='text-text-primary text-subtitle3 lg:text-lg-medium max-w-[428px]'>
          Reach different levels and access special rewards
        </h3>
        <div className='bottom-10 left-10 right-10 lg:absolute'>
          <img src='/images/home/rewards-levels.png' alt='Rewards Levels' />
          <img
            className='animate-swing absolute bottom-6 right-2 h-16 lg:-right-4 lg:bottom-2 lg:h-20'
            src='/images/home/gift.svg'
            alt='Gift'
          />
        </div>
      </div>
      <div className='bg-background-component row-span-2 hidden items-center justify-center rounded-xl p-6 lg:flex lg:gap-0 lg:p-8'>
        <img
          className='mx-auto h-[600px]'
          src='/images/home/about-phone.png'
          data-aos='fade-up'
          alt='Phone'
        />
      </div>
      <div className='bg-background-component relative flex flex-col gap-6 rounded-lg p-6 lg:h-[410px] lg:gap-0 lg:rounded-xl lg:p-8'>
        <h3 className='text-text-primary text-subtitle3 lg:text-lg-medium max-w-[428px]'>
          Receive exclusive RMO airdrops
        </h3>
        <div className='bottom-10 left-10 right-10 lg:absolute'>
          <img src='/images/home/rewards-tasks.png' alt='Rewards Tasks' />
          <img
            className='animate-swing absolute bottom-8 right-4 h-12 lg:-right-6 lg:h-16'
            src='/images/home/coin.svg'
            alt='Coin'
          />
        </div>
      </div>
    </UiContainer>
  )
}
