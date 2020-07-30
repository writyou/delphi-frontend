import React from 'react';
import { Form, FormProps } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Button } from 'components';
import { Hint } from 'components/Hint/Hint';

type AnyObject = Record<string, any>;

export type FormTemplateProps<FormValues extends AnyObject> = Omit<
  FormProps<FormValues>,
  'subscription'
> & {
  submitButton?: string;
};

export function AllocateFormTemplate<FormValues extends AnyObject>(
  props: FormTemplateProps<FormValues>,
) {
  const { submitButton, ...restProps } = props;

  const children = React.Children.toArray(restProps.children);

  return (
    <Form
      {...restProps}
      subscription={{ submitError: true, submitting: true, dirtySinceLastSubmit: true }}
    >
      {({ handleSubmit, submitError, submitting, dirtySinceLastSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="flex-start" spacing={3}>
            {children.map((child, index) => (
              <Grid key={index} item xs={4}>
                {child}
              </Grid>
            ))}
          </Grid>
          {}
          {!dirtySinceLastSubmit && !!submitError && (
            <Grid item xs={12}>
              <Hint>
                <Typography color="error">{submitError}</Typography>
              </Hint>
            </Grid>
          )}
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : submitButton || 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}
