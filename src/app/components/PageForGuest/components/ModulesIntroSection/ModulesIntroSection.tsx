import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box } from '@akropolis-web/components';

import { routes } from 'app/routes';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useAuthContext } from 'services/auth';
import { useSubscribable } from 'utils/react';

import * as images from './images';
import { ModuleIntroButton } from '../ModuleIntroButton/ModuleIntroButton';

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
  const { t } = useTranslate();
  const { web3Manager, openModal } = useAuthContext();
  const history = useHistory();

  const [account] = useSubscribable(() => web3Manager.account$, [], null);

  const handleModuleIntroButtonClick = useCallback(
    (redirectPath: string) => {
      if (!account) {
        openModal(redirectPath);
        return;
      }

      history.push(redirectPath);
    },
    [account],
  );

  return (
    <Grid container spacing={4}>
      {modules.map((module, index) => (
        <Box clone minWidth={215} key={index}>
          <Grid container item xs={12} md={6}>
            <ModuleIntroButton
              title={t(tKeys[module].title.getKey())}
              subtitle={t(tKeys[module].subtitle.getKey())}
              buttonLabel={t(tKeys[module].button.getKey())}
              backgroundPath={modulesData[module].backgroundPath}
              onClick={() => handleModuleIntroButtonClick(modulesData[module].redirectPath)}
            />
          </Grid>
        </Box>
      ))}
    </Grid>
  );
}
