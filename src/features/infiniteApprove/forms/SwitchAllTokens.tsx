import React, { useCallback } from 'react';
import * as R from 'ramda';
import { FormApi } from 'final-form';

import { SwitchInput } from 'components/inputs';

type Props = {
  tokens: {
    [x: string]: boolean;
  };
  form: FormApi<any>;
  isDisabled: boolean;
};

export function SwitchAllTokens(props: Props) {
  const { tokens, form, isDisabled } = props;

  const handleOnChange = useCallback((_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    form.batch(() => {
      Object.keys(tokens).forEach(tokenTitle => {
        form.change(tokenTitle, checked);
      });
    });
  }, []);

  const isChecked = R.values(tokens).every(hasChecked => hasChecked);

  return <SwitchInput disabled={isDisabled} checked={isChecked} onChange={handleOnChange} />;
}
