import React from 'react';
import { Form, FormProps } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Hint, Button } from 'components';
import { makeStyles } from 'utils/styles';

type AnyObject = Record<string, any>;

export type FormTemplateProps<FormValues extends AnyObject> = Omit<
  FormProps<FormValues>,
  'subscription'
> & {
  submitButton?: string;
};

export function InfiniteApproveFormTemplate<FormValues extends AnyObject>(
  props: FormTemplateProps<FormValues>,
) {
  const { submitButton, ...restProps } = props;
  const classes = useStyles();

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
          <Grid container justify="center" spacing={2}>
            <Grid container item direction="column">
              <Grid item container xs>
                {children}
              </Grid>
              <Grid item className={classes.submit}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || hasValidationErrors}
                >
                  {submitting ? <CircularProgress size={24} /> : submitButton || 'Submit'}
                </Button>
              </Grid>
            </Grid>
            {!dirtySinceLastSubmit && !!submitError && (
              <Grid item xs={12}>
                <Hint>
                  <Typography color="error">{submitError}</Typography>
                </Hint>
              </Grid>
            )}
          </Grid>
        </form>
      )}
    </Form>
  );
}

const useStyles = makeStyles(() => ({
  submit: {
    paddingTop: 3,
    paddingLeft: 32,
  },
}));
