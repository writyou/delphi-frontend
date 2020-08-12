import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Intro, Loading, LinkProps } from 'components';
import { routes } from 'app/routes';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { AuthButton } from 'features/auth';

import { LandingIcon, DelphiTextLogo } from '../Icons';
import { useStyles } from './Intro.styles';
import { DCA_LINK } from '../constants';

function LandingIntro() {
  const classes = useStyles();

  return (
    <Intro
      icon={
        <>
          <LandingIcon fontSize="inherit" />
          <DelphiTextLogo className={classes.textLogo} />
        </>
      }
      title={
        <div>
          Automate your DeFi life: <br />
          Combine and compound DeFi yields and{' '}
          <Link href={DCA_LINK} color="inherit" target="_blank" rel="noopener noreferrer">
            DCA
          </Link>{' '}
          your way into ETH & BTC
        </div>
      }
    >
      <div className={classes.buttons}>
        Try it on{' '}
        <div className={classes.button}>
          <RedirectOrAuthButton to="http://localhost:8083" variant="contained">
            Mainnet
          </RedirectOrAuthButton>
        </div>
        or{' '}
        <div className={classes.button}>
          <RedirectOrAuthButton to="https://delphi-rinkeby.akropolis.io" variant="outlined">
            Rinkeby
          </RedirectOrAuthButton>
        </div>
        <div className={classes.button}>
          <Link
            href="https://invis.io/Z3YEH8QNYSK#/425936541_Delphi"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Prototype
          </Link>
        </div>
      </div>
    </Intro>
  );
}

function RedirectOrAuthButton({
  to,
  variant,
  children,
}: {
  to: string;
  variant: 'outlined' | 'contained';
  children: React.ReactNode;
}) {
  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account$, [api]);

  const needToAuth = window.location.origin.includes(to);

  const commonProps = {
    size: 'large',
    color: 'primary',
    variant,
    children,
  } as const;

  if (!needToAuth) {
    return (
      <Button
        {...commonProps}
        component={Link as React.FunctionComponent<Omit<LinkProps, 'variant'>>}
        underline="none"
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  }

  return (
    <Loading meta={accountMeta} loader={<Button {...commonProps} disabled />}>
      {account ? (
        <Button {...commonProps} component={RouterLink} to={routes.summary.getRedirectPath()} />
      ) : (
        <AuthButton {...commonProps} connectRedirectPath={routes.summary.getRedirectPath()} />
      )}
    </Loading>
  );
}

export { LandingIntro };
