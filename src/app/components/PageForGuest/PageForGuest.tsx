import React from 'react';

import { CatPaws, ChartWithCat } from 'components/icons';
import { Grid, FormattedAmount, Label } from 'components';
import { percentAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

import { ModulesIntroSection } from './components/ModulesIntroSection/ModulesIntroSection';

export function PageForGuest() {
  const classes = useStyles();

  return (
    <Grid container spacing={10}>
      <Grid item xs={6} container spacing={4}>
        <Grid item xs={12} container alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Label>Composition</Label>
          </Grid>
          <Grid item>
            <CatPaws className={classes.icon} />
          </Grid>
          <Grid item>
            <div className={classes.metric}>
              <div className={classes.title}>APY</div>
              <div className={classes.apyValue}>
                <FormattedAmount sum={percentAmount} />
              </div>
            </div>
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
    metric: {},
    title: {
      fontSize: 16,
      fontWeight: 300,
    },
    apyValue: {
      fontSize: 32,
      fontWeight: 300,
    },
  }),
  { name: 'PageForGuest' },
);
