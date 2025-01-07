import { HTMLAttributes } from 'react'

import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import {
  ArrowIconButtonLeft,
  ArrowIconButtonRight,
} from '@/components/Homepage/components/ArrowIconButtons'
import { cn } from '@/theme/utils'
import { UiContainer } from '@/ui'

export default function NewsSection() {
  return (
    <UiContainer
      className={cn('bg-backgroundContainer p-2')}
      isFullHeight={false}
    >
      <div
        className={cn(
          'relative flex flex-col overflow-hidden rounded-3xl bg-backgroundPure py-[72px]',
        )}
      >
        <div className='mb-[72px] mt-auto flex items-center gap-5 px-[72px]'>
          <span className='text-textPrimary typography-h2'>News and blogs</span>

          <div className='ml-auto flex items-center gap-4'>
            <ArrowIconButtonLeft isDisabled>
              <ArrowRightSLineIcon className={'rotate-180 text-textDisabled'} />
            </ArrowIconButtonLeft>
            <ArrowIconButtonRight>
              <ArrowRightSLineIcon />
            </ArrowIconButtonRight>
          </div>
        </div>

        <NewsSectionCarousel />
      </div>
    </UiContainer>
  )
}

function NewsSectionCarousel() {
  const community = [
    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/a833/1549/bdc4f5ce0a84e92975b33d4c536b0a13?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QuOlgWGQY4bmmrsHY-XLlsOAmaHx7qXv4e1kIUqeCpTRsyVcSc~BLEEwj9ywbofPPmpvHOO34DDXx7acL3Jm9gk51mbNLckbtmVKIYanSV7hxaTaYgS-fDez4wm2vOGJ-j2WoAdvNwOS8Am5Jd8i1s4hKhZqlGY8UPNU9AAetu~K2VWQlE0Ac2deo8m1TjgysrCIaz3OrMJgxG2Wq3VcAZUeOWOiXh2ka93DevV8ZNOzZWIAVfK5PZEoQ4pXZCQ1ah8xbz2kNoqvRUz1OUTHroEkrwJ-l3nbSR3W4NLn-TV1fHZj7z6I4sS4-t6TUHtUL-IYSlnRRBrMpBW0ZbDuVQ__',
      desc: "Rarimo's Worldcoin Alternative RariMe Goes Live",
    },
    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/8628/ad74/1b16bacc3c1c4278e67bb4e9c31e53fc?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hyU2Wnt6hQ-jId77wh7L0bkoBA6AjSDXBR8lWN3Fpk5r-JsUmvieFHxyqO~FkUrhvi7oTuDIubXmwPlvwVp~Vve2R5VhUSuzT~pXLTo4~9JcYls0S1U8uNO0lbxAdCfmqlQsy~w8FOsl7dxDspyhMrWJfGqnGD2brTBZKYdzlThQ076w16~qpR4utJAIsOFbqxzDkOtkkk4v4HGu9tSpr1Y36hu91Wvj~4VoDemhzwIjpc67cctZbn0bsPM8YQ2KCxqFaF4BaNeudNMF4MQYUE7JNX6cMIyBsNwUwllUZ5C7Y~y-48Azc-otZgxzJYlo8APB6EgjytEyOllE5562rA__',
      desc: 'Former Pussy Riot lawyer launches blockchain-powered referendum...',
    },
    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/a90b/398c/7429c6a883f31fd079ccbc12917ec0e9?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gtR10ALXXYJvRvEfOhIZeU3wkt6SFNXozwxOhGmvKmu5jf9no1uFx6EZUE9mEXrVeP3wLuPI0U7rjnKZDr4YYtHNMWX~rojMknRhWUrq47SoQ5~Y8K2hCHdoiRnmjbj8~8qtTi2S~BQAVRPZuQmwiXt4tmTpS1Gxz74HSf1orv1si5RxotioiU3RRv0uyq4IibDKo~M~U2Icc04XNNYEr0b6lNkV9ustgi24uLKCImwKA-cfydyZ~rZzV~tf9tqj~kDl-6tNL8b7xu2NigVnmEw4DrutjxoEbShNIMmO8RFo7Yx8GxQXxhyPl7eEKv6bmvM~UADVAQb2rzo1QnzXLQ__',
      desc: 'Rarimo introduces ZK-based voting tool for secure, anonymous...',
    },
    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/3a49/81a4/0630a2b9735e04cd12dd9c8da7cb3844?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i4xUvd7l5Zymt9xG8OyUiNBAucftqxbod~lPy5vR78wq~Sh5vFBGuCeBEfzBF~TgX4iZP6YLsWCAqPHlWJxRsC36LjsTUnvVAI1icf3m5a9QFcCfbSoQWFgp8tWx3EGUlg0dcWliFWm73KyphT61tlv5QYVew4CltONZlfetjkpfY2KWkDDgX-SluRgW7UodVadAyapREq9rn2I-c9922azdRcCffUAdyJ8V-51X-8Qh5CNIGRg3y7cZ-mdMbQlE2Py7SI6iiRUnpIJejLukhTNrWjcD3HXxYZlrtrTjU1vACh1gMG2OFfb5VL2s51EweZ-TR989XL9Ea3SVchM9AQ__',
      desc: 'Polygon ID comes to Ethereum thanks to Rarimo integration, more chains to come',
    },

    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/a833/1549/bdc4f5ce0a84e92975b33d4c536b0a13?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QuOlgWGQY4bmmrsHY-XLlsOAmaHx7qXv4e1kIUqeCpTRsyVcSc~BLEEwj9ywbofPPmpvHOO34DDXx7acL3Jm9gk51mbNLckbtmVKIYanSV7hxaTaYgS-fDez4wm2vOGJ-j2WoAdvNwOS8Am5Jd8i1s4hKhZqlGY8UPNU9AAetu~K2VWQlE0Ac2deo8m1TjgysrCIaz3OrMJgxG2Wq3VcAZUeOWOiXh2ka93DevV8ZNOzZWIAVfK5PZEoQ4pXZCQ1ah8xbz2kNoqvRUz1OUTHroEkrwJ-l3nbSR3W4NLn-TV1fHZj7z6I4sS4-t6TUHtUL-IYSlnRRBrMpBW0ZbDuVQ__',
      desc: "Rarimo's Worldcoin Alternative RariMe Goes Live",
    },
    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/8628/ad74/1b16bacc3c1c4278e67bb4e9c31e53fc?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hyU2Wnt6hQ-jId77wh7L0bkoBA6AjSDXBR8lWN3Fpk5r-JsUmvieFHxyqO~FkUrhvi7oTuDIubXmwPlvwVp~Vve2R5VhUSuzT~pXLTo4~9JcYls0S1U8uNO0lbxAdCfmqlQsy~w8FOsl7dxDspyhMrWJfGqnGD2brTBZKYdzlThQ076w16~qpR4utJAIsOFbqxzDkOtkkk4v4HGu9tSpr1Y36hu91Wvj~4VoDemhzwIjpc67cctZbn0bsPM8YQ2KCxqFaF4BaNeudNMF4MQYUE7JNX6cMIyBsNwUwllUZ5C7Y~y-48Azc-otZgxzJYlo8APB6EgjytEyOllE5562rA__',
      desc: 'Former Pussy Riot lawyer launches blockchain-powered referendum...',
    },
    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/a90b/398c/7429c6a883f31fd079ccbc12917ec0e9?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gtR10ALXXYJvRvEfOhIZeU3wkt6SFNXozwxOhGmvKmu5jf9no1uFx6EZUE9mEXrVeP3wLuPI0U7rjnKZDr4YYtHNMWX~rojMknRhWUrq47SoQ5~Y8K2hCHdoiRnmjbj8~8qtTi2S~BQAVRPZuQmwiXt4tmTpS1Gxz74HSf1orv1si5RxotioiU3RRv0uyq4IibDKo~M~U2Icc04XNNYEr0b6lNkV9ustgi24uLKCImwKA-cfydyZ~rZzV~tf9tqj~kDl-6tNL8b7xu2NigVnmEw4DrutjxoEbShNIMmO8RFo7Yx8GxQXxhyPl7eEKv6bmvM~UADVAQb2rzo1QnzXLQ__',
      desc: 'Rarimo introduces ZK-based voting tool for secure, anonymous...',
    },
    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/3a49/81a4/0630a2b9735e04cd12dd9c8da7cb3844?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i4xUvd7l5Zymt9xG8OyUiNBAucftqxbod~lPy5vR78wq~Sh5vFBGuCeBEfzBF~TgX4iZP6YLsWCAqPHlWJxRsC36LjsTUnvVAI1icf3m5a9QFcCfbSoQWFgp8tWx3EGUlg0dcWliFWm73KyphT61tlv5QYVew4CltONZlfetjkpfY2KWkDDgX-SluRgW7UodVadAyapREq9rn2I-c9922azdRcCffUAdyJ8V-51X-8Qh5CNIGRg3y7cZ-mdMbQlE2Py7SI6iiRUnpIJejLukhTNrWjcD3HXxYZlrtrTjU1vACh1gMG2OFfb5VL2s51EweZ-TR989XL9Ea3SVchM9AQ__',
      desc: 'Polygon ID comes to Ethereum thanks to Rarimo integration, more chains to come',
    },
  ]

  return (
    <div className='relative h-[260px] w-full max-w-full overflow-auto'>
      <div className={'absolute flex gap-4 px-[72px]'}>
        {community.map((el, idx) => {
          return (
            <NewsSectionItemCard key={idx} desc={el.desc} imgUrl={el.imgUrl} />
          )
        })}
      </div>
    </div>
  )
}

function NewsSectionItemCard({
  imgUrl,
  desc,
  className,
  ...rest
}: {
  imgUrl: string
  desc: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col gap-6 p-6',
        'relative h-[260px] w-[320px] rounded-[20px] bg-additionalOpacited backdrop-blur-[24px]',
        className,
      )}
    >
      <img
        className='mb-auto aspect-video w-full rounded-lg'
        src={imgUrl}
        alt={desc}
      />

      <span className='text-textPrimary typography-subtitle4'>{desc}</span>
    </div>
  )
}
