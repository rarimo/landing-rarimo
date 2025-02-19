import { time } from '@distributedlab/tools'
import { Calendar } from 'lucide-react'

import SubscribeInput from '@/common/SubscribeInput'
import BlogFooter from '@/components/Blog/components/BlogFooter'
import BlogNavbar from '@/components/Blog/components/BlogNavbar'
import { config } from '@/config'
import { cn } from '@/theme/utils'
import { UiHorizontalDivider } from '@/ui'

type Article = {
  id: number
  documentId: string
  title: string
  shortDescription: string
  date: string
  type: string
  videoUrl?: string
  content: {
    type: 'list'
    format: 'unordered'
    children: [
      {
        type: 'list-item'
        children: [
          {
            text: 'text 1'
            type: 'text'
          },
        ]
      },
      {
        type: 'list-item'
        children: [
          {
            text: 'text 2'
            type: 'text'
          },
        ]
      },
    ]
  }[]
  coverImage: string
  author: {
    id: number
    documentId: string
    name: string
    description: string
    avatar: string
  }
}

export default async function Article({ params }: { params: { id: string } }) {
  const response = await fetch(`${config.blogApiUrl}/posts/${params.id}`)

  if (!response.ok) {
    return <div>Error</div>
  }

  const { data: article } = (await response.json()) as {
    data: Article
  }

  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[1136px] flex-col',
        'px-4 md:px-6 lg:px-0',
      )}
    >
      <BlogNavbar />

      <UiHorizontalDivider className='mb-6' />

      <div className='mx-auto flex max-w-[671px] flex-col'>
        <img
          src={article.coverImage}
          alt={article.title}
          className='aspect-[671/336] rounded-2xl'
        />

        <h2 className='mt-6 text-textPrimary typography-h2'>{article.title}</h2>
        <div className='mb-3 mt-4 flex items-center gap-2'>
          <Calendar className={'size-4 text-textSecondary'} />
          <span className='text-textSecondary typography-subtitle5'>
            {time(article.date).format('MMM DD, YYYY')}
          </span>
        </div>

        <div className='mt-5'>
          {[
            'Oleksandr Kurbatov, Lasha Antadze',
            'For a while, the dream of decentralized, anonymous voting felt illusory. Solutions like Semaphore are excellent for low-risk scenarios such as private DAO voting, but state elections and other high-risk scenarios require the anonymity, eligibility and uniqueness of voters to be totally guaranteed.',
            'Historically, decentralized voting systems have only ever been able to guarantee two of these three properties at once. Rarimo’s Freedom Tool was the first solution to use passport-based voting to guarantee all three simultaneously.',
            'In this article, we start with an exploration of the standard decentralized voting protocol and show the additional layers that can be added to create a fully robust system that overcomes the trade-offs between anonymity, eligibility and uniqueness.',
            'We include the infrastructure used in Freedom Tool, and end with a proposal for a new kind of incognito passport-based protocol. This does away with single use-cases for country-specific passports and instead allows for an incognito network of varied characteristics that different applications can interact with.',
          ].map((el, idx) => (
            <p
              key={idx}
              className='mt-4 whitespace-pre-line text-textPrimary typography-body2'
            >
              {el}
            </p>
          ))}

          <img
            className='mt-6 h-auto w-full rounded-xl'
            src={'https://picsum.photos/700/260'}
            alt={'bla-bla'}
          />

          <p className='mt-4 whitespace-pre-line text-textPrimary typography-body2'>
            Sections:
          </p>

          <ul className='mt-2 list-inside list-disc'>
            {[
              'Passport challenges',
              'Passport-based voting trilemma',
              'Centralized identity provider',
              'Centralized identity provider + usage of salt for blinding passport nullifier',
            ].map((el, idx) => (
              <li key={idx}>{el}</li>
            ))}
          </ul>
        </div>

        <div className='mt-10 flex items-center gap-4 rounded-xl bg-componentPrimary p-4'>
          <img
            className='aspect-square size-12 rounded-full object-cover object-center'
            src={article.author.avatar}
            alt={article.author.name}
          />

          <div className='flex flex-col'>
            <span className='text-textPrimary typography-subtitle3'>
              {article.author.name}
            </span>
            <span className='text-textSecondary typography-body3'>
              {article.author.description}
            </span>
          </div>
        </div>
      </div>

      <UiHorizontalDivider className='my-12' />

      <SubscribeInput className='mx-auto mb-12' />

      <BlogFooter />
    </div>
  )
}
