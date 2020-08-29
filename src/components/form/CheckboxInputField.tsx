import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { useTranslate } from 'services/i18n';
import { wrapComponentIntoFormField } from 'utils/react';

import { CheckboxInput } from '../inputs';

type Props = React.ComponentProps<typeof CheckboxInput> & FieldRenderProps<any, HTMLElement>;

function CheckboxFieldComponent(props: Props) {
  const { input, meta, ...rest } = props;
  const { type: inputType, ...restInput } = input;
  const { t } = useTranslate();
  const error =
    typeof rest.error === 'boolean'
      ? rest.error && meta.error && t(meta.error)
      : meta.touched && meta.error && t(meta.error);
  const value = typeof input.value === 'boolean' ? undefined : input.value;
  return (
    <CheckboxInput
      {...rest}
      helperText={error}
      error={Boolean(error)}
      {...restInput}
      value={value}
    />
  );
}

export const CheckboxField = wrapComponentIntoFormField(CheckboxFieldComponent, 'checkbox');
