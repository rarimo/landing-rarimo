import './SubscribeForm.scss';

import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import TextField from '@/components/TextField';
import { REGEX } from '@/const';
import useForm from '@/hooks/useForm';
import { mailchimpApi } from '@/mailchimp-api';

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
    if (isSuccess || isSubmitting || errors.email) return;

    try {
      await mailchimpApi.post('/v1/subscriptions', {
        body: {
          email: values.email,
        },
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
    <form className="subscribe-form" onSubmit={handleSubmit}>
      {isSuccess ? (
        <h6 className="subscribe-form__success-msg">
          {t('subscribe-section.success-msg')}
        </h6>
      ) : (
        <TextField
          name="email"
          placeholder={t('subscribe-section.input-plh')}
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          appendSlot={
            <AppButton
              className="subscribe-form__btn"
              scheme={APP_BUTTON_SCHEMES.text}
              textKey={t('subscribe-section.subscribe-btn')}
              type="submit"
              disabled={isSubmitting}
            />
          }
        />
      )}
    </form>
  );
};

export default memo(SubscribeSection);
