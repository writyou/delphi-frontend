import React, { useMemo } from 'react';
import { Grid, Box } from '@akropolis-web/components';

import { routes } from 'app/routes';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { GradientArrowButton } from 'components/GradientArrowButton/GradientArrowButton';
import { makeStyles } from 'utils/styles';

import * as images from './images';
import { PoolIntroCard } from './PoolIntroCard';

const pools = ['savings', 'investments', 'dca', 'staking'] as const;
type Pool = typeof pools[number];

const cardsDataByPoolType: Record<Pool, { redirectPath: string; backgroundPath: string }> = {
  savings: {
    redirectPath: routes.savings.getRedirectPath(),
    backgroundPath: images.Savings,
  },
  investments: {
    redirectPath: routes.investments.getRedirectPath(),
    backgroundPath: images.Investments,
  },
  dca: {
    redirectPath: routes.dca.getRedirectPath(),
    backgroundPath: images.DCA,
  },
  staking: {
    redirectPath: routes.staking.getRedirectPath(),
    backgroundPath: images.Staking,
  },
};

const tKeys = tKeysAll.components.poolsIntroSection;

export function PoolsIntroSection() {
  const classes = useStyles();
  const { t } = useTranslate();

  const cardsData = useMemo(
    () =>
      pools.map(pool => ({
        title: t(tKeys[pool].title.getKey()),
        subtitle: t(tKeys[pool].subtitle.getKey()),
        backgroundPath: cardsDataByPoolType[pool].backgroundPath,
        button: (
          <GradientArrowButton to={cardsDataByPoolType[pool].redirectPath}>
            {t(tKeys[pool].button.getKey())}
          </GradientArrowButton>
        ),
      })),
    [t],
  );

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item xs={12}>
        <div className={classes.text}>
          You don’t have any pools yet. Wanna become a proud yield farmer but don’t know where to
          start? Here are some tips:
        </div>
      </Grid>
      <Grid container item xs={12} spacing={4} wrap="wrap">
        {cardsData.map((cardData, index) => (
          <Box minWidth={215} flexGrow={1} clone>
            <Grid item key={index} xs={12} md={6}>
              <PoolIntroCard {...cardData} />
            </Grid>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    text: {
      fontWeight: 300,
    },
  }),
  { name: 'PoolsIntroSection' },
);
