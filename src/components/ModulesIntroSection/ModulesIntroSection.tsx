import React from 'react';
import { Grid, Typography, Box } from '@akropolis-web/components';

import { routes } from 'app/routes';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { makeStyles } from 'utils/styles';

import * as images from './images';
import { ModuleIntroButton } from './ModuleIntroButton';

const modules = ['savings', 'investments', 'dca', 'staking'] as const;
type Module = typeof modules[number];

const modulesData: Record<Module, { redirectPath: string; backgroundPath: string }> = {
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

const tKeys = tKeysAll.components.modulesIntroSection;

export function ModulesIntroSection() {
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item xs={12}>
        <Typography className={classes.text}>
          You don’t have any pools yet. Wanna become a proud yield farmer but don’t know where to
          start? Here are some tips:
        </Typography>
      </Grid>
      <Grid container item spacing={4} justify="center">
        {modules.map((module, index) => (
          <Box clone minWidth={215} key={index}>
            <Grid container item xs={12} md={6}>
              <ModuleIntroButton
                title={t(tKeys[module].title.getKey())}
                subtitle={t(tKeys[module].subtitle.getKey())}
                buttonLabel={t(tKeys[module].button.getKey())}
                backgroundPath={modulesData[module].backgroundPath}
                to={modulesData[module].redirectPath}
              />
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
  { name: 'ModulesIntroSection' },
);
