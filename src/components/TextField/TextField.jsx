import './TextField.scss';

import cn from 'classnames';
import { useMemo } from 'react';

const TextField = props => {
  const {
    name,
    error,
    className,
    withErrorMessage = true,
    appendSlot,
    ...rest
  } = props;

  const isInvalid = useMemo(() => Boolean(error), [error]);

  return (
    <fieldset
      className={cn([
        'text-field',
        className,
        {
          'text-field--invalid': isInvalid,
        },
      ])}
    >
      <div className="text-field__inner">
        <input
          className="text-field__input"
          id={name}
          name={name}
          type="text"
          autoComplete="off"
          {...rest}
        />
        {appendSlot && (
          <div className="text-field__append-inner">{appendSlot}</div>
        )}
      </div>
      {withErrorMessage && (
        <div
          className={cn([
            'text-field__error-message',
            {
              'text-field__error-message--visible': isInvalid,
            },
          ])}
        >
          <svg className="text-field__error-icon" height="16" width="16">
            <use href="/icons/sprite.svg#icon-warning"></use>
          </svg>
          <span>{error}</span>
        </div>
      )}
    </fieldset>
  );
};

export default TextField;
