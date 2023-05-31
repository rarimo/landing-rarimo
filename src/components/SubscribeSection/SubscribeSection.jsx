import './SubscribeSection.scss';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import TextField from '@/components/TextField';
import { REGEX } from '@/const';
import useForm from '@/hooks/useForm';
import { hubspotApi } from '@/hubspot-api';

const SubscribeSection = () => {
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);

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
    setError,
  } = useForm(initialValues, onSubscribe, validationSchema);

  async function onSubscribe() {
    if (isSubmitting || errors.email) return;

    try {
      await hubspotApi.post('/v1/subscriptions', {
        email: values.email,
      });
      setIsSuccess(true);
    } catch (e) {
      if (e?.response?.status === 400) {
        setError('email', 'Already subscribed');
      } else {
        setError('email', e?.response?.message ?? 'Something went wrong');
      }
    }
  }

  return (
    <section className="subscribe-section">
      <div className="subscribe-section__inner">
        <div className="container">
          <h3 className="subscribe-section__title" data-aos="fade-up">
            {t('subscribe-section.title')}
          </h3>
          <p className="subscribe-section__description" data-aos="fade-up">
            {t('subscribe-section.description')}
          </p>
          {isSuccess ? (
            <h6>{t('subscribe-section.success-msg')}</h6>
          ) : (
            <form
              className="subscribe-section__form"
              onSubmit={handleSubmit}
              data-aos="fade-up"
            >
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
          )}
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
