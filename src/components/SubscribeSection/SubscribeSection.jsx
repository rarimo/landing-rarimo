import './SubscribeSection.scss';

import { useTranslation } from 'react-i18next';
import SectionWrapper, {
  SECTION_WRAPPER_SCHEME,
} from '@/components/SectionWrapper';

const SubscribeSection = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper scheme={SECTION_WRAPPER_SCHEME.accent}>
      <section className="subscribe-section container">
        <div className="subscribe-section__content">
          <h4 className="subscribe-section__title">
            {t('subscribe-section.title')}
          </h4>
          <p className="subscribe-section__description">
            {t('subscribe-section.description')}
          </p>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default SubscribeSection;
