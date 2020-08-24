import React, { ReactNode } from 'react';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Hint } from '../../Hint/Hint';
import { Button } from '../../Button';
import { FormTemplateProps } from './FormTemplate';

type AnyObject = Record<string, any>;

export type AllocateFormTemplateProps<FormValues extends AnyObject> = FormTemplateProps<
  FormValues
> & {
  infiniteUnlock: ReactNode;
  hasLimits: boolean;
  gasPriceField?: ReactNode;
};

export function AllocateFormTemplate<FormValues extends AnyObject>(
  props: AllocateFormTemplateProps<FormValues>,
) {
  const { submitButton, infiniteUnlock, gasPriceField, hasLimits, ...restProps } = props;

  const children = React.Children.toArray(restProps.children);

  return (
    <Form
      {...restProps}
      subscription={{
        submitError: true,
        submitting: true,
        dirtySinceLastSubmit: true,
        hasValidationErrors: true,
      }}
    >
      {({ handleSubmit, submitError, submitting, dirtySinceLastSubmit, hasValidationErrors }) => (
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="flex-start" spacing={3}>
            {children.map((child, index) => (
              <Grid key={index} item xs={4}>
                {child}
              </Grid>
            ))}
          </Grid>
          {!dirtySinceLastSubmit && !!submitError && (
            <Grid item xs={12}>
              <Hint>
                <Typography color="error">{submitError}</Typography>
              </Hint>
            </Grid>
          )}
          {hasLimits && (
            <Grid container justify="space-between" alignItems="flex-start" spacing={6}>
              {gasPriceField && <Grid item>{gasPriceField}</Grid>}
              <Grid item xs>
                <Grid container spacing={6} justify="flex-end" alignItems="center">
                  <Grid item>{infiniteUnlock}</Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      disabled={submitting || hasValidationErrors}
                    >
                      {submitting ? <CircularProgress size={24} /> : submitButton || 'Submit'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </form>
      )}
    </Form>
  );
}
