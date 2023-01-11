import './AdvantagesSection.scss';

import { useTranslation } from 'react-i18next';
import BaseCardList from '@/components/BaseCardList';
import PartnersList from '@/components/PartnersList';
import { advantagesList, supportedFTList } from '@/template-data';

const AdvantagesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="advantages-section">
      <div
        className="advantages-section__browser-img container"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        <video playsInline controls width="100%">
          <source src="/video/nft-settlement-demo.webm" type="video/webm" />
          <source src="/video/nft-settlement-demo.mp4" type="video/mp4" />
        </video>
      </div>

      <PartnersList
        className="advantages-section__partners"
        centered
        titleKey="advantages-section.supported-ft-title"
        items={supportedFTList}
      />

      <BaseCardList className="container">
        {advantagesList.map((item, index) => (
          <div key={index}>
            <svg
              className="advantages-section__card-icon"
              height="32"
              width="32"
            >
              <use href={item.icon}></use>
            </svg>
            <h5 className="advantages-section__card-title">
              {t(item.titleKey)}
            </h5>
            <p className="advantages-section__card-text">{t(item.textKey)}</p>
          </div>
        ))}
      </BaseCardList>
    </section>
  );
};

export default AdvantagesSection;
