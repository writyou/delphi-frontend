import React from 'react';
import { Form, FormProps } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import cn from 'classnames';

import { Hint } from 'components/Hint/Hint';
import { makeStyles } from 'utils/styles';

import { Button } from '../../Button';

type AnyObject = Record<string, any>;

export type FormTemplateProps<FormValues extends AnyObject> = Omit<
  FormProps<FormValues>,
  'subscription'
> & {
  title?: string;
  cancelButton?: string;
  submitButton?: string;
  onCancel?(): void;
};

export function FormTemplate<FormValues extends AnyObject>(props: FormTemplateProps<FormValues>) {
  const { title, cancelButton, submitButton, onCancel, ...restProps } = props;

  const children = React.Children.toArray(restProps.children);

  const classes = useStyles();

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
          <Grid container justify="center" spacing={4}>
            <Grid item xs={12}>
              {title && (
                <Typography variant="h5" gutterBottom>
                  {title}
                </Typography>
              )}
            </Grid>
            {children.map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                className={cn(classes.formElement, {
                  // TODO uncomment after forms redesign
                  // [classes.withoutBorder]: index === children.length - 1,
                  [classes.withoutBorder]: true,
                })}
              >
                {item}
              </Grid>
            ))}
            {!dirtySinceLastSubmit && !!submitError && (
              <Grid item xs={12}>
                <Hint>
                  <Typography color="error">{submitError}</Typography>
                </Hint>
              </Grid>
            )}
            <Grid item xs={6}>
              {onCancel && (
                <Button variant="outlined" fullWidth onClick={onCancel}>
                  {cancelButton || 'Cancel'}
                </Button>
              )}
            </Grid>
            <Grid item xs={6}>
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
        </form>
      )}
    </Form>
  );
}

const useStyles = makeStyles(() => ({
  formElement: {
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  withoutBorder: {
    border: 'none',
    marginBottom: 0,
  },
}));
