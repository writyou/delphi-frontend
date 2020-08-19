import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Intro, LinkProps, Grid, ButtonProps } from 'components';
import { routes } from 'app/routes';
import { Adaptive, useBreakpointsMatch } from 'services/adaptability';

import { LandingIcon, DelphiTextLogo } from '../Icons';
import { useStyles } from './Intro.styles';
import { DCA_LINK } from '../constants';

function LandingIntro() {
  const classes = useStyles();

  const isMobile = useBreakpointsMatch({ to: 'tabletXS' });

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
      <Grid container spacing={isMobile ? 3 : 5} alignItems="center" className={classes.buttons}>
        <Grid item xs className={classes.button}>
          <RedirectButton to="https://delphi.akropolis.io" variant="contained">
            Mainnet
          </RedirectButton>
        </Grid>
        <Grid item xs className={classes.button}>
          <RedirectButton to="https://delphi-rinkeby.akropolis.io" variant="outlined">
            Rinkeby
          </RedirectButton>
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

function RedirectButton({
  to,
  variant,
  children,
}: {
  to: string;
  variant: 'outlined' | 'contained';
  children: React.ReactNode;
}) {
  const isEqualDomain = window.location.origin.includes(to);

  const commonProps = {
    size: 'large',
    color: 'primary',
    variant,
    children,
  } as const;

  if (!isEqualDomain) {
    return (
      <>
        <Adaptive from="mobileXS" to="tabletXS">
          {renderButton('small')}
        </Adaptive>
        <Adaptive from="tabletXS">{renderButton('large')}</Adaptive>
      </>
    );
  }

  return <Button {...commonProps} component={RouterLink} to={routes.summary.getRedirectPath()} />;

  function renderButton(size?: ButtonProps['size']) {
    const classes = useStyles();

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
