import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { routes } from 'app/routes';
import { AuthButton } from 'features/auth';
import { MintTestnetTokenButton } from 'features/mintTestnetToken';
import { ETH_NETWORK_CONFIG } from 'env';

import { LiveStats } from './LiveStats/LiveStats';
import { useStyles } from './NewHeader.style';
import { Logo } from './icons';
import { Links } from './Links';

export const NewHeader: React.FC = () => {
  const classes = useStyles();
  const match = useRouteMatch<{ page: string }>(routes.summary.getRoutePath());

  return (
    <header className={classes.root}>
      <div className={classes.leftPart}>
        <Link to="/">
          <Logo />
        </Link>
        <nav className={classes.links}>
          <Links />
        </nav>
      </div>
      <div className={classes.rightPart}>
        {ETH_NETWORK_CONFIG.id !== 1 && (
          <div className={classes.button}>
            <MintTestnetTokenButton color="primary" variant="outlined" />
          </div>
        )}
        {match && (
          <div className={classes.liveStats}>
            <LiveStats />
          </div>
        )}
        <div className={classes.button}>
          <AuthButton disconnectRedirectPath={routes.summary.getRedirectPath()} />
        </div>
      </div>
    </header>
  );
};
