import * as React from 'react';

import { Metric, Label, FormattedAmount, Grid } from 'components';
import { makeStyles } from 'utils/styles';
import { PercentAmount } from 'model/entities';
import { Fraction } from 'model/entities/Fraction';

type Props = {
  value: string;
  title: string;
  withComingSoon?: boolean;
  icon?: React.ReactNode;
  button?: React.ReactNode;
};

export function AverageAPYMocked(props: Props) {
  const { value, title, icon, button, withComingSoon } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Metric
        title={
          <Grid container direction="column" className={classes.container}>
            <Label withComingSoon={withComingSoon}>{title}</Label>
            <div className={classes.chart}>{icon && icon}</div>
            Average APY
          </Grid>
        }
        value={<FormattedAmount sum={new PercentAmount(new Fraction(value, '1'))} />}
      />
      {button && <div className={classes.button}>{button}</div>}
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      marginBottom: 16,
    },
    title: {
      fontSize: 12,
    },
    chart: {
      marginTop: 26,
      marginBottom: 26,
    },
    button: {
      marginTop: 43,
    },
  }),
  { name: 'AverageAPYMocked' },
);
