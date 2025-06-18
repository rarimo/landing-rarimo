import Link from 'next/link'

import GithubFillIcon from '@/assets/icons/github-fill-icon.svg'
import TelegramLineIcon from '@/assets/icons/telegram-line-icon.svg'
import TwitterXFillIcon from '@/assets/icons/twitter-x-fill-icon.svg'
import { config } from '@/config'

export default function LearningHubFooter() {
  const linkClasses =
    'w-5 text-textSecondary transition duration-300 hover:text-textPrimary'

  return (
    <div className='flex flex-col items-center gap-6 pb-12 text-center'>
      <div className='flex items-center gap-4'>
        <Link href={config.xLink} target='_blank'>
          <TwitterXFillIcon className={linkClasses} />
        </Link>
        <Link href={config.telegramLink} target='_blank'>
          <TelegramLineIcon className={linkClasses} />
        </Link>
        <Link href={config.githubLink} target='_blank'>
          <GithubFillIcon className={linkClasses} />
        </Link>
      </div>

      <span className='text-textSecondary typography-body3'>
        Permissionless (ZK) Registries
      </span>
    </div>
  )
}
