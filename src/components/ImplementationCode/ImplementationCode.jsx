import './ImplementationCode.scss';

import cn from 'classnames';
import Highlight, { defaultProps } from 'prism-react-renderer';

const codeExample = `import { RarimoPayButton, getRarimoSupportedChains } from "rarimo-checkout-react-component"; const chains = getRarimoSupportedChains(); <RarimoPayButton buttonProps={{ label: "Buy with Rarimo" }} tokenChain="ETH" chainList={{ chains }} />`;

const theme = {
  plain: {},
  styles: [
    {
      types: ['property', 'imports'],
      style: {
        color: 'var(--primary-title-color)',
        transitionProperty: 'color',
        transitionDuration: 'var(--medium-transition-duration)',
        transitionTimingFunction: 'var(--hover-transition-timing-function)',
      },
    },
    {
      types: ['operator', 'punctuation'],
      style: {
        color: 'var(--primary-text-color)',
        transitionProperty: 'color',
        transitionDuration: 'var(--medium-transition-duration)',
        transitionTimingFunction: 'var(--hover-transition-timing-function)',
      },
    },
    {
      types: ['keyword', 'module', 'attr-value'],
      style: {
        color: '#3388CB',
      },
    },
    {
      types: ['string', 'attr-name'],
      style: {
        color: '#789E37',
      },
    },
    {
      types: ['tag', 'function'],
      style: {
        color: '#D46E80',
      },
    },
  ],
};

const defineTokenClass = types => {
  const typesString = types.join(' ');

  switch (typesString) {
    case 'tag script language-javascript punctuation':
    case 'tag attr-value punctuation':
      return 'implementation-code__punctuation';

    case 'tag script language-javascript':
    case 'plain':
      return 'implementation-code__plain';

    default:
      return '';
  }
};

const ImplementationCode = ({ wrapperClassName }) => {
  return (
    <Highlight
      {...defaultProps}
      code={codeExample}
      theme={theme}
      language="jsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(['implementation-code', wrapperClassName, className])}
          style={style}
        >
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({
                line,
                className: 'implementation-code__line',
                key: i,
              })}
            >
              {line.map((token, key) => (
                <span
                  key={key}
                  {...getTokenProps({
                    token,
                    key,
                    className: defineTokenClass(token.types),
                  })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default ImplementationCode;
