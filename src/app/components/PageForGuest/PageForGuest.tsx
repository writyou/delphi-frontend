import React from 'react';

import { CatPaws, ChartWithCat } from 'components/icons';
import { Grid, FormattedAmount, Metric } from 'components';
import { percentAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

import { ModulesIntroSection } from './components/ModulesIntroSection/ModulesIntroSection';

export function PageForGuest() {
  const classes = useStyles();

  return (
    <Grid container spacing={10}>
      <Grid item xs={6} container spacing={4}>
        <Grid item container alignItems="center" spacing={3} xs={12}>
          <Grid item>
            <CatPaws className={classes.icon} />
          </Grid>
          <Grid item>
            <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ChartWithCat className={classes.cat} />
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <ModulesIntroSection />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    icon: {
      fontSize: 50,
    },
    cat: {
      width: '100%',
      height: 'unset',
      maxWidth: 553,
    },
  }),
  { name: 'PageForGuest' },
);
