import { time } from '@distributedlab/tools'
import DOMPurify from 'isomorphic-dompurify'
import { ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'

import LearningHubFooter from '@/components/LearningHub/components/LearningHubFooter'
import LearningHubNavbar from '@/components/LearningHub/components/LearningHubNavbar'
import { LearningHubPost } from '@/components/LearningHub/types'
import { config } from '@/config'
import { cn } from '@/theme/utils'
import { UiHorizontalDivider } from '@/ui'

const createMarkup = (htmlString: string) => {
  const safeHTML = DOMPurify.sanitize(htmlString)

  return { __html: safeHTML }
}

export default async function LearningHubPostPage({
  params,
}: {
  params: { id: string }
}) {
  const postId = params.id.split('-').pop()
  const response = await fetch(`${config.learningHubApiUrl}/posts/${postId}`, {
    next: { revalidate: config.learningHubApiCacheInvalidateDur },
  })

  if (!response.ok) {
    return <div>Error</div>
  }

  const { data: post } = (await response.json()) as {
    data: LearningHubPost
  }

  return (
    <>
      <LearningHubNavbar />
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
            href={'/learning-hub'}
            className={cn('p-4', 'md:absolute md:left-0 md:top-0 md:p-0')}
            data-aos='fade-in'
          >
            <ArrowLeft className='size-4 text-textSecondary' />
          </Link>

          <div className='mx-auto flex w-full max-w-[671px] flex-col overflow-hidden'>
            {post.attributes.videoUrl ? (
              <>
                {post.attributes.videoUrl.includes('youtube.com') ||
                post.attributes.videoUrl.includes('youtu.be') ? (
                  <iframe
                    className='aspect-[671/336] rounded-2xl'
                    title='Embedded video'
                    src={`https://www.youtube.com/embed/${new URL(post.attributes.videoUrl).searchParams.get('v') || post.attributes.videoUrl.split('/').pop()}`}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    data-aos='fade-up'
                  />
                ) : (
                  <video
                    className='aspect-[671/336] rounded-2xl'
                    controls
                    poster={post.attributes.coverImage}
                  >
                    <source src={post.attributes.videoUrl} type='video/mp4' />
                    <track kind='captions' src='' label='captions' default />
                    Your browser does not support the video tag.
                  </video>
                )}
              </>
            ) : (
              <img
                src={post.attributes.coverImage}
                alt={post.attributes.title}
                className='aspect-[671/336] rounded-2xl'
                data-aos='fade-up'
              />
            )}

            <h2
              className='mt-6 text-textPrimary typography-h2'
              data-aos='fade-up'
            >
              {post.attributes.title}
            </h2>
            <div
              className='mb-3 mt-4 flex items-center gap-2'
              data-aos='fade-up'
            >
              <Calendar className={'size-4 text-textSecondary'} />
              <span className='text-textSecondary typography-subtitle5'>
                {time(post.attributes.date).format('MMM DD, YYYY')}
              </span>
            </div>

            <div
              id='post-content'
              className='mt-5 w-full max-w-full overflow-hidden'
              dangerouslySetInnerHTML={createMarkup(post.attributes.content)}
              data-aos='fade-up'
            />

            <div
              className='mt-10 flex items-center gap-4 rounded-xl bg-componentPrimary p-4'
              data-aos='fade-in'
            >
              <img
                className='aspect-square size-12 rounded-full object-cover object-center'
                src={post.attributes.author.data.attributes.avatar}
                alt={post.attributes.author.data.attributes.name}
              />

              <div className='flex flex-col' data-aos='fade-in'>
                <span className='text-textPrimary typography-subtitle3'>
                  {post.attributes.author.data.attributes.name}
                </span>
                <span className='text-textSecondary typography-body3'>
                  {post.attributes.author.data.attributes.description}
                </span>
              </div>
            </div>
          </div>

          <UiHorizontalDivider className='my-12' />

          <LearningHubFooter />
        </div>
      </div>
    </>
  )
}
