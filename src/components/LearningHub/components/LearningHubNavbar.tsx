'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'

import LogoIcon from '@/assets/icons/logo-icon.svg'
import HomeHeader from '@/common/HomeHeader'
import ThemeSwitcher from '@/common/ThemeSwitcher'
import { QueryFilters } from '@/components/LearningHub/constants'
import { cn } from '@/theme/utils'

export default function LearningHubNavbar({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(null)

  const sanitizedSearchParams = useMemo(() => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    params.set(QueryFilters.Search, searchQuery)
    return params
  }, [searchParams, searchQuery])

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1136px]',
        'flex items-center',
        'sm:px-6 sm:py-4 lg:px-0 lg:pb-0',
      )}
    >
      <Link href={'/'} className={cn('hidden', 'sm:flex')}>
        <LogoIcon data-aos='fade-in' />
      </Link>
      <div className={cn('flex w-full', 'sm:hidden')}>
        <HomeHeader />
      </div>

      <div className={cn('ml-auto hidden items-center gap-4', 'sm:flex')}>
        <div
          className={cn(
            'relative hidden min-h-[36px] w-[36px] min-w-[36px] rounded-full bg-componentPrimary transition-all',
            'hover:w-[200px] has-[:active]:w-[200px] has-[:focus]:w-[200px]',
          )}
        >
          <div className='absolute right-0 flex items-center justify-end pl-3'>
            <input
              ref={searchInputRef}
              onInput={e => setSearchQuery(e.currentTarget.value)}
              className={cn(
                'w-full flex-1 bg-transparent typography-body3',
                'outline-0 focus:outline-0',
              )}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  router.push(
                    `/learning-hub?${sanitizedSearchParams.toString()}`,
                  )
                  searchInputRef.current?.blur()
                }
              }}
              placeholder='name, title, desc, ...'
            />
            {searchQuery ? (
              <Link
                className={cn(
                  'ml-auto flex size-[36px] items-center justify-center',
                  'outline-0 active:outline-0',
                )}
                href={`/learning-hub?${sanitizedSearchParams.toString()}`}
              >
                <Search className='size-3.5 flex-1' />
              </Link>
            ) : (
              <button
                className={cn(
                  'ml-auto flex size-[36px] items-center justify-center',
                  'outline-0 active:outline-0',
                )}
                onClick={() => {
                  searchInputRef.current?.focus()
                }}
              >
                <Search className='size-3.5 flex-1' />
              </button>
            )}
          </div>
        </div>

        <div data-aos='fade-in'>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
