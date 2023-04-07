import './SubscribeSection.scss';

import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import SectionWrapper, {
  SECTION_WRAPPER_SCHEME,
} from '@/components/SectionWrapper';
import TextField from '@/components/TextField';
import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import useForm from '@/hooks/useForm';
import { REGEX } from '@/const';
import { hubspotApi } from '@/hubspot-api';
import { CONFIG } from '@/config';

const SubscribeSection = () => {
  const { t } = useTranslation();

  const initialValues = {
    email: '',
  };

  const validationSchema = {
    email: yup
      .string()
      .matches(REGEX.email, t('subscribe-section.err-wrong-format'))
      .required(t('subscribe-section.err-email-required')),
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm(initialValues, onSubscribe, validationSchema);

  const isSubscribed = async (email) => {
    try {
      const { status } = await hubspotApi.get('/v1/subscriptions', {
        email,
      })
      return status === 200
    } catch (e) {
      return false
    }
  }

  async function onSubscribe() {
    if (isSubmitting || errors.email) return;

    try {
      if (await isSubscribed(values.email)) return

      const resp = await hubspotApi.get('/v1/subscriptions', {
        emailAddress: values.email,
      })

      console.log(resp)
    } catch (e) {
      console.error(e);
    }
  }

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
          <form className="subscribe-section__form" onSubmit={handleSubmit}>
            <TextField
              name="email"
              placeholder={t('subscribe-section.input-plh')}
              value={values.email}
              error={errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              appendSlot={
                <AppButton
                  className="subscribe-section__subscribe-btn"
                  scheme={APP_BUTTON_SCHEMES.secondary}
                  textKey={t('subscribe-section.subscribe-btn')}
                  type="submit"
                  disabled={isSubmitting}
                />
              }
            />
          </form>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default SubscribeSection;
