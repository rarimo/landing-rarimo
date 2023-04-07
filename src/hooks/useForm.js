import { useCallback, useMemo, useState } from 'react';
import { object as yupObject } from 'yup';

function isValidationError(err) {
  return 'inner' in err;
}

function serializeYupErrors(err, touchedFields) {
  return err.inner.reduce((acc, val) => {
    const fieldName = val.path;

    if (touchedFields) {
      if (fieldName && touchedFields[fieldName]) acc[fieldName] = val.message;
    } else {
      if (fieldName) acc[fieldName] = val.message;
    }

    return acc;
  }, {});
}

function getInputValue(input) {
  switch (input.type) {
    case 'file':
      return input.files;
    case 'checkbox':
      return input.checked;
    default:
      return input.value;
  }
}

const useForm = (initialValues, submitHandler, validationSchema) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const schema = useMemo(() => {
    if (!validationSchema) return;

    return yupObject(validationSchema);
  }, [validationSchema]);

  const validate = useCallback(
    async touchedFields => {
      if (schema) {
        const fields = touchedFields ?? touched;

        await schema
          .validate(values, { abortEarly: false })
          .then(() => {
            setErrors({});
          })
          .catch(err => {
            const validationErrors = serializeYupErrors(err, fields);
            setErrors(validationErrors);
          });
      }
    },
    [schema, values, touched],
  );

  const handleChange = useCallback(event => {
    const { currentTarget } = event;

    const input = currentTarget;

    setValues(prevValues => ({
      ...prevValues,
      [input.name]: getInputValue(input),
    }));
  }, []);

  const handleBlur = useCallback(
    async event => {
      const { currentTarget: input } = event;

      if (!touched[input.name]) {
        setTouched(prevValues => ({
          ...prevValues,
          [input.name]: true,
        }));
      }

      const touchedFields = { ...touched, [input.name]: true };

      await validate(touchedFields);
    },
    [touched, validate],
  );

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      try {
        await validate();

        setIsSubmitting(true);

        await submitHandler(values);

        setIsSubmitting(false);
      } catch (err) {
        setIsSubmitting(false);

        const validationErrors = isValidationError(err)
          ? serializeYupErrors(err)
          : {};

        setErrors(validationErrors);

        const touchedFields = {};

        Object.keys(initialValues).forEach(item => {
          touchedFields[item] = true;
        });

        setTouched(touchedFields);
      }
    },
    [initialValues, validate, values, submitHandler],
  );

  const setMultiValues = useCallback(values => {
    setValues(prevValues => ({
      ...prevValues,
      ...values,
    }));
  }, []);

  const setMultiErrors = useCallback(errors => {
    const touchedFields = Object.keys(errors).map(item => ({
      [item]: true,
    }));

    setTouched(prevValues => ({
      ...prevValues,
      ...touchedFields,
    }));

    setErrors(prevValues => ({
      ...prevValues,
      ...errors,
    }));
  }, []);

  const setValue = useCallback((name, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const setError = useCallback((name, err) => {
    setTouched(prevValues => ({
      ...prevValues,
      [name]: true,
    }));

    setErrors(prevValues => ({
      ...prevValues,
      [name]: err,
    }));
  }, []);

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setMultiValues,
    setMultiErrors,
    setValue,
    setError,
    isSubmitting,
  };
};

export default useForm;
