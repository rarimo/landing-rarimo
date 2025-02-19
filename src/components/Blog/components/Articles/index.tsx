import { ChevronDown } from 'lucide-react'

import Filters from './components/Filters'
import List from './components/List'

export default function Articles() {
  return (
    <div className='flex flex-col'>
      <Filters className='mt-10' />
      <List className='mt-10' />

      <button className='mx-auto mt-14 flex items-center gap-1'>
        <span className='text-textSecondary typography-buttonMedium'>
          Show more
        </span>
        <ChevronDown className={'size-4 text-textSecondary'} />
      </button>
    </div>
  )
}
