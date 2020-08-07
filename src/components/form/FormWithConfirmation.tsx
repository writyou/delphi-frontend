import React, { useState, useCallback } from 'react';

// import { useSubscribable } from 'utils/react';
import { ConfirmationDialog } from 'components/ConfirmationDialog/ConfirmationDialog';
// import { toObservable } from 'utils/rxjs';

import { FormTemplate, FormTemplateProps } from './FormTemplate';

type AnyObject = Record<string, any>;

export type FormWithConfirmationProps<FormData extends AnyObject> = Omit<
  FormTemplateProps<FormData>,
  never
> & {
  DialogContent: React.FC<FormData>;
  CustomFormTemplate?: React.FC<FormTemplateProps<FormData>>;
};

export function FormWithConfirmation<FormData extends AnyObject>(
  props: FormWithConfirmationProps<FormData>,
) {
  const { DialogContent, onSubmit, onCancel, CustomFormTemplate, ...restProps } = props;

  type SubmittingArgs = Parameters<typeof onSubmit>;
  const [submittingArgs, setArgs] = useState<SubmittingArgs | null>(null);
  const values = submittingArgs && submittingArgs[0];

  const handleSubmit = useCallback((...args: SubmittingArgs) => setArgs(args), []);

  const handleConfirmationClick = useCallback(async () => {
    if (!submittingArgs) {
      throw new Error('Submitting args is not found');
    }

    await onSubmit(...submittingArgs);

    setArgs(null);
    onCancel && onCancel();
  }, [onCancel, submittingArgs]);

  const handlePTokenExchangingConfirmationCancel = useCallback(() => {
    setArgs(null);
  }, []);

  /* const dialogContent = useSubscribable(
    () => toObservable(values ? getDialogContent(values) : '⏳'),
    [values, getDialogContent],
    '⏳',
  ); */

  const Template = CustomFormTemplate || FormTemplate;

  return (
    <>
      <Template<FormData> {...restProps} onSubmit={handleSubmit} onCancel={onCancel} />
      <ConfirmationDialog
        isOpen={!!submittingArgs}
        noText="No"
        yesText="Yes"
        title="Confirm action"
        onCancel={handlePTokenExchangingConfirmationCancel}
        onConfirm={handleConfirmationClick}
      >
        {values && <DialogContent {...values} />}
      </ConfirmationDialog>
    </>
  );
}
