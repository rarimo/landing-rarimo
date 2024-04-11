import './ProtocolSection.scss';

import { COMPONENT_NODE_IDS } from '@/const';
import useAppContext from '@/hooks/useAppContext';

import GlowingCard from '../GlowingCard';

const ProtocolSection = () => {
  const { isDesktop } = useAppContext();

  return (
    <section
      id={COMPONENT_NODE_IDS.protocolSection}
      className="protocol-section"
    >
      <div className="container">
        <div className="protocol-section__title-wrp" data-aos="fade-up">
          <h2 className="protocol-section__title">Protocol layer</h2>
          <p className="protocol-section__text">
            The protocol acts as an identity state broadcasting network,
            bridging Identity authentication and private social graph
            interactions across blockchains
          </p>
        </div>

        <GlowingCard className="protocol-section__content" data-aos="fade-up">
          <div className="protocol-section__img-wrp">
            <img
              className="protocol-section__img"
              src={
                isDesktop
                  ? '/img/home/protocol.png'
                  : '/img/home/protocol-mobile.png'
              }
              alt="Protocol Layer"
            />
          </div>
          <div className="protocol-section__list">
            <p className="protocol-section__list-item">Decentralized</p>
            <p className="protocol-section__list-item">
              POS with Instant finality
            </p>
            <p className="protocol-section__list-item">
              Privacy via Zero Knowledge Proofs
            </p>
            <div className="protocol-section__list-item protocol-section__list-item--large">
              <span>Efficiency through</span>
              <div className="protocol-section__list-item-line" />
              <span className="protocol-section__list-sub-item">
                Identity state aggregation
              </span>
              <span className="protocol-section__list-sub-item">
                On-demand replication
              </span>
            </div>
          </div>
        </GlowingCard>
      </div>
    </section>
  );
};

export default ProtocolSection;
