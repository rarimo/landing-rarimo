import { UiContainer } from '@/ui'

export default function PurposeSection() {
  return (
    <UiContainer className='gap-15 flex flex-col text-center'>
      <span className='text-h6 md:text-h5 text-textPrimary'>მიზანი</span>

      <p className='text-h5 md:text-h4 text-primaryMain'>
        წინა რეფორმებმა საქართველოში მსოფლიო ყურადღება მიიპყრო. ახლა კი დროა
        გადავიდეთ ახალ ეტაპზე რომელიც გლობალურ მასშტაბზე იმუშავებს.
      </p>
    </UiContainer>
  )
}
