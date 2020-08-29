import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { useTranslate } from 'services/i18n';
import { wrapComponentIntoFormField } from 'utils/react';

import { TokenAmountInput, TokenAmountInputProps } from '../inputs';

type Props = Omit<TokenAmountInputProps, 'onChange' | 'value' | 'helperText'> &
  FieldRenderProps<TokenAmountInputProps['value'], HTMLElement>;

function TokenAmountFieldComponent(props: Props) {
  const { input, meta, ...rest } = props;
  const { t } = useTranslate();

  const error =
    typeof rest.error === 'boolean'
      ? rest.error && meta.error && t(meta.error)
      : meta.touched && meta.error && t(meta.error);

  return <TokenAmountInput {...rest} helperText={error} error={Boolean(error)} {...input} />;
}

export const TokenAmountField = wrapComponentIntoFormField(TokenAmountFieldComponent);
