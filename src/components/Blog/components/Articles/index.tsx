import Filters from './components/Filters'
import List from './components/List'

export default function Articles() {
  return (
    <div className='flex flex-col'>
      <Filters className='mt-10' />
      <List className='mt-10' />
    </div>
  )
}
