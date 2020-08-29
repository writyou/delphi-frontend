import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { useTranslate } from 'services/i18n';
import { wrapComponentIntoFormField } from 'utils/react';

import { TextInput } from '../inputs';

type Props = Omit<React.ComponentProps<typeof TextInput>, 'ref'> &
  FieldRenderProps<any, HTMLElement>;

function TextInputFieldComponent(props: Props) {
  const { input, meta, ...rest } = props;
  const { t } = useTranslate();
  const error =
    typeof rest.error === 'boolean'
      ? rest.error && meta.error && t(meta.error)
      : meta.touched && meta.error && t(meta.error);
  return <TextInput {...rest} helperText={error} error={Boolean(error)} {...input} />;
}

export const TextInputField = wrapComponentIntoFormField(TextInputFieldComponent);
