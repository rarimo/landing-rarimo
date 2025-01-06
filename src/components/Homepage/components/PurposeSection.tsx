import { Container } from '@/ui'

export default function PurposeSection() {
  return (
    <Container className='flex flex-col gap-15 text-center'>
      <span className='text-h6 text-textPrimary md:text-h5'>მიზანი</span>

      <p className='text-h5 text-primaryMain md:text-h4'>
        წინა რეფორმებმა საქართველოში მსოფლიო ყურადღება მიიპყრო. ახლა კი დროა
        გადავიდეთ ახალ ეტაპზე რომელიც გლობალურ მასშტაბზე იმუშავებს.
      </p>
    </Container>
  )
}
