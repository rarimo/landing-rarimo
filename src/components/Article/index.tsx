import { time } from '@distributedlab/tools'
import DOMPurify from 'isomorphic-dompurify'
import { ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'

import SubscribeForm from '@/common/SubscribeForm'
import BlogFooter from '@/components/Blog/components/BlogFooter'
import BlogNavbar from '@/components/Blog/components/BlogNavbar'
import { SingleArticle } from '@/components/Blog/types'
import { config } from '@/config'
import { cn } from '@/theme/utils'
import { UiHorizontalDivider } from '@/ui'

const createMarkup = (htmlString: string) => {
  const safeHTML = DOMPurify.sanitize(htmlString)

  return { __html: safeHTML }
}

export default async function Article({ params }: { params: { id: string } }) {
  const response = await fetch(`${config.blogApiUrl}/posts/${params.id}`)

  if (!response.ok) {
    return <div>Error</div>
  }

  const { data: article } = (await response.json()) as {
    data: SingleArticle
  }

  return (
    <>
      <BlogNavbar />
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1136px] flex-col',
          'px-4 md:px-6 lg:px-0',
        )}
      >
        <UiHorizontalDivider className='my-6' />

        <div className='relative flex w-full flex-col'>
          {/*TODO: navigate back with same parameters*/}
          <Link
            href={'/blog'}
            className={cn('p-4', 'md:absolute md:left-0 md:top-0 md:p-0')}
          >
            <ArrowLeft className='size-4 text-textSecondary' />
          </Link>

          <div className='mx-auto flex w-full max-w-[671px] flex-col overflow-hidden'>
            <img
              src={article.attributes.coverImage}
              alt={article.attributes.title}
              className='aspect-[671/336] rounded-2xl'
            />

            <h2 className='mt-6 text-textPrimary typography-h2'>
              {article.attributes.title}
            </h2>
            <div className='mb-3 mt-4 flex items-center gap-2'>
              <Calendar className={'size-4 text-textSecondary'} />
              <span className='text-textSecondary typography-subtitle5'>
                {time(article.attributes.date).format('MMM DD, YYYY')}
              </span>
            </div>

            <div
              id='article-content'
              className='mt-5 w-full max-w-full overflow-hidden'
              dangerouslySetInnerHTML={createMarkup(article.attributes.content)}
            />

            <div className='mt-10 flex items-center gap-4 rounded-xl bg-componentPrimary p-4'>
              <img
                className='aspect-square size-12 rounded-full object-cover object-center'
                src={article.attributes.author.data.attributes.avatar}
                alt={article.attributes.author.data.attributes.name}
              />

              <div className='flex flex-col'>
                <span className='text-textPrimary typography-subtitle3'>
                  {article.attributes.author.data.attributes.name}
                </span>
                <span className='text-textSecondary typography-body3'>
                  {article.attributes.author.data.attributes.description}
                </span>
              </div>
            </div>
          </div>

          <UiHorizontalDivider className='my-12' />

          <SubscribeForm className='mx-auto mb-12' />

          <BlogFooter />
        </div>
      </div>
    </>
  )
}
