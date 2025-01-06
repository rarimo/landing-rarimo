import LogoIcon from '@/assets/icons/logo-icon.svg'
import { Config } from '@/config'
import { cn } from '@/theme/utils'
import { Container } from '@/ui'

export default function FooterSection() {
  return (
    <Container
      className='flex flex-col items-center justify-between gap-8 py-8 sm:flex-row'
      data-aos='fade-up'
      data-aos-delay='100'
    >
      <div className='block sm:hidden' data-aos='fade-up' data-aos-delay='300'>
        {/*<LogoSymbolIcon />*/}
      </div>
      <div className='hidden sm:block'>
        <LogoIcon />
      </div>

      <div
        className='flex flex-row items-center gap-6 lg:gap-4'
        data-aos='fade-up'
        data-aos-delay='500'
      >
        <a
          className={cn(
            'w-full items-center justify-center transition-transform',
            'hover:scale-110',
          )}
          href={Config.appStoreLink}
          target='_blank'
        >
          <img
            className=''
            src='/images/app-store.svg'
            alt='Hero'
            data-aos='fade-up'
          />
        </a>
        <a
          className={cn(
            'w-full items-center justify-center transition-transform',
            'hover:scale-110',
          )}
          href={Config.googlePlayLink}
          target='_blank'
        >
          <img
            className=''
            src='/images/g-play.svg'
            alt='Hero'
            data-aos='fade-up'
          />
        </a>
      </div>
    </Container>
  )
}
