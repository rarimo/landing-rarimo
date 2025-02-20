import { Categories } from '@/components/Blog/constants'

export type ArticleCard = {
  id: number
  attributes: {
    title: string
    shortDescription: string
    date: string
    type: Categories
    videoUrl?: string
    coverImage: string
  }
}

export type SingleArticle = {
  id: number
  attributes: {
    title: string
    shortDescription: string
    date: string
    type: string
    videoUrl?: string
    content: string
    coverImage: string
    author: {
      data: {
        id: number
        attributes: {
          name: string
          description: string
          avatar: string
        }
      }
    }
  }
}
