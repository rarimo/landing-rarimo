'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { HTMLAttributes, useMemo, useRef, useState } from 'react'

import LogoIcon from '@/assets/icons/logo-icon.svg'
import ThemeSwitcher from '@/common/ThemeSwitcher'
import { QueryFilters } from '@/components/Blog/constants'
import { cn } from '@/theme/utils'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'>

export default function BlogNavbar({ className, ...rest }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(null)

  const sanitizedSearchParams = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    params.set(QueryFilters.Search, searchQuery)
    return params
  }, [searchParams, searchQuery])

  return (
    <div {...rest} className={cn('flex items-center py-8', className)}>
      <Link href={'/'}>
        <LogoIcon />
      </Link>

      <div className='ml-auto flex items-center gap-4'>
        <div
          className={cn(
            'relative hidden min-h-[36px] w-[36px] min-w-[36px] overflow-hidden rounded-full bg-componentPrimary transition-all',
            'hover:w-[200px] has-[:active]:w-[200px] has-[:focus]:w-[200px]',
            // TODO: uncomment once ready
            // 'sm:flex',
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
                  router.push(`/blog?${sanitizedSearchParams.toString()}`)
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
                href={`/blog?${sanitizedSearchParams.toString()}`}
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

        <ThemeSwitcher />
      </div>
    </div>
  )
}
