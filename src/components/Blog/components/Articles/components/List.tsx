import type { HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'

import Item from './Item'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'>

export default function List({ className, ...rest }: Props) {
  const items = [
    {
      imgUrl: 'https://picsum.photos/400/200',
      title: 'Anti-Sybil Solutions Landscape',
      desc: 'The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good',
      date: 1739963745,
    },
    {
      imgUrl: 'https://picsum.photos/400/200',
      title: 'Anti-Sybil Solutions Landscape',
      desc: 'The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good',
      date: 1739963745,
    },
    {
      imgUrl: 'https://picsum.photos/400/200',
      title: 'Anti-Sybil Solutions Landscape',
      desc: 'The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good',
      date: 1739963745,
    },
    {
      imgUrl: 'https://picsum.photos/400/200',
      title: 'Anti-Sybil Solutions Landscape',
      desc: 'The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good',
      date: 1739963745,
    },
    {
      imgUrl: 'https://picsum.photos/400/200',
      title: 'Anti-Sybil Solutions Landscape',
      desc: 'The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good',
      date: 1739963745,
    },
    {
      imgUrl: 'https://picsum.photos/400/200',
      title: 'Anti-Sybil Solutions Landscape',
      desc: 'The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good',
      date: 1739963745,
    },
    {
      imgUrl: 'https://picsum.photos/400/200',
      title: 'Anti-Sybil Solutions Landscape',
      desc: 'The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good',
      date: 1739963745,
    },
    {
      imgUrl: 'https://picsum.photos/400/200',
      title: 'Anti-Sybil Solutions Landscape',
      desc: 'The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good',
      date: 1739963745,
    },
    {
      imgUrl: 'https://picsum.photos/400/200',
      title: 'Anti-Sybil Solutions Landscape',
      desc: 'The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good The world needs anti-sybils, but if these solutions are not fully decentralized or private, they can easily create more harm than good',
      date: 1739963745,
    },
  ]

  return (
    <div
      {...rest}
      className={cn('flex flex-wrap justify-between gap-6', className)}
    >
      {items.map((el, idx) => (
        <Item
          key={idx}
          className={cn('w-full', 'sm:w-[45%]', 'lg:w-[31%]')}
          title={el.title}
          desc={el.desc}
          imgUrl={el.imgUrl}
          date={el.date}
        />
      ))}
    </div>
  )
}
