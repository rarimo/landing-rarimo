import Link from 'next/link'

import { cn } from '@/theme/utils'

import UiContainer from '../ui/UiContainer'

export default function NotFound() {
  return (
    <UiContainer
      showGradientDecor
      gradientDecorClassName={cn(
        '-right-[275px] -top-[205px] -rotate-[10deg] h-[367px] w-[438px]',
        'md:-right-[105px] md:-top-[225px] md:-rotate-[10deg] md:h-[367px] md:w-[438px]',
      )}
      className={cn(
        'flex flex-col items-center justify-center bg-backgroundContainer px-4',
      )}
    >
      <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='text-primary mb-4 !font-extrabold !tracking-tight typography-h1 lg:text-9xl'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-textPrimary md:text-4xl'>
            {"Something's missing."}
          </p>
          <p className='mb-4 text-lg font-light text-textSecondary'>
            {
              "Sorry, we can't find that page. You'll find lots to explore on the home page."
            }
          </p>
          <Link
            href='/'
            className='my-4 inline-flex rounded-lg bg-componentPrimary px-5 py-2.5 text-center text-sm font-medium text-textPrimary hover:ring-textPrimary focus:outline-none focus:ring-4'
          >
            {'Back to Homepage'}
          </Link>
        </div>
      </div>
    </UiContainer>
  )
}
