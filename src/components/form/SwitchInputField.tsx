import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { useTranslate } from 'services/i18n';
import { wrapComponentIntoFormField } from 'utils/react';

import { SwitchInput } from '../inputs';

type Props = Omit<React.ComponentProps<typeof SwitchInput>, 'ref'> &
  FieldRenderProps<any, HTMLElement>;

function SwitchInputFieldComponent(props: Props) {
  const { input, meta, value, ...rest } = props;
  const { t } = useTranslate();
  const error =
    typeof rest.error === 'boolean'
      ? rest.error && meta.error && t(meta.error)
      : meta.touched && meta.error && t(meta.error);
  return <SwitchInput {...rest} helperText={error} error={Boolean(error)} {...input} />;
}

export const SwitchInputField = wrapComponentIntoFormField(SwitchInputFieldComponent, 'checkbox');
