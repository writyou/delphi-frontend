import React, { ReactNode } from 'react';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Button, FormTemplateProps } from 'components';
import { Hint } from 'components/Hint/Hint';

type AnyObject = Record<string, any>;

export type AllocateFormTemplateProps<FormValues extends AnyObject> = FormTemplateProps<
  FormValues
> & {
  infiniteUnlock: ReactNode;
  gasPriceField?: ReactNode;
};

export function AllocateFormTemplate<FormValues extends AnyObject>(
  props: AllocateFormTemplateProps<FormValues>,
) {
  const { submitButton, infiniteUnlock, gasPriceField, ...restProps } = props;

  const children = React.Children.toArray(restProps.children);

  return (
    <Form
      {...restProps}
      subscription={{
        submitError: true,
        submitting: true,
        dirtySinceLastSubmit: true,
        errors: true,
      }}
    >
      {({ handleSubmit, submitError, submitting, dirtySinceLastSubmit, errors }) => (
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
                    disabled={submitting || Object.keys(errors).length > 0}
                  >
                    {submitting ? <CircularProgress size={24} /> : submitButton || 'Submit'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}
