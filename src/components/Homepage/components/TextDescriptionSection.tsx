import { useTranslation } from '@/hooks/useTranslation'
import { Container } from '@/ui'

export default function TextDescriptionSection() {
  const { t } = useTranslation()

  return (
    <Container>
      <div className='flex flex-row flex-wrap gap-8 lg:max-w-[85%] lg:gap-12'>
        <p
          className='block text-h5 text-textPrimary lg:text-h4'
          data-aos='fade-up'
          data-aos-delay='150'
        >
          {t('text-description-section.title')}
        </p>

        <p
          className='block text-textPrimary lg:flex-[0.5]'
          data-aos='fade-up'
          data-aos-delay='250'
        >
          {t('text-description-section.text-1')}
        </p>
        <p
          className='block text-textPrimary lg:flex-[0.5]'
          data-aos='fade-up'
          data-aos-delay='350'
        >
          {t('text-description-section.text-2')}
        </p>
      </div>
    </Container>
  )
}
