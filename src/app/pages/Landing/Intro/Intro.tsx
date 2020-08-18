import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Intro, Loading, LinkProps, Grid, ButtonProps } from 'components';
import { routes } from 'app/routes';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { AuthButton } from 'features/auth';
import { Adaptive } from 'services/adaptability';

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
      <Grid container alignItems="center" justify="space-between" className={classes.buttons}>
        <Grid item className={classes.button}>
          <RedirectOrAuthButton to="https://delphi.akropolis.io" variant="contained">
            Mainnet
          </RedirectOrAuthButton>
        </Grid>
        <Grid item className={classes.button}>
          <RedirectOrAuthButton to="https://delphi-rinkeby.akropolis.io" variant="outlined">
            Rinkeby
          </RedirectOrAuthButton>
        </Grid>
        <Grid item className={classes.button}>
          <Link
            href="https://invis.io/Z3YEH8QNYSK#/425936541_Delphi"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Prototype
          </Link>
        </Grid>
      </Grid>
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
  const classes = useStyles();

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
      <>
        <Adaptive from="mobileXS" to="tabletXS">
          {renderButton('small')}
        </Adaptive>
        <Adaptive from="tabletXS">{renderButton('large')}</Adaptive>
      </>
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

  function renderButton(size?: ButtonProps['size']) {
    return (
      <Button
        {...commonProps}
        component={Link as React.FunctionComponent<Omit<LinkProps, 'variant'>>}
        underline="none"
        href={to}
        fullWidth
        className={classes.buttonComponent}
        size={size}
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  }
}

export { LandingIntro };
