import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Intro } from 'components';
import { routes } from 'app/routes';

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
        {/* <div className={classes.button}>
          <Button
            disabled
            size="large"
            color="gradient"
            variant="contained"
            component={Link as React.FunctionComponent<Omit<LinkProps, 'color' | 'variant'>>}
            underline="none"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Prototype
          </Button>
        </div> */}
        <div className={classes.button}>
          <Button
            component={RouterLink}
            to={routes.savings.getRedirectPath()}
            size="large"
            color="primary"
            variant="outlined"
          >
            Rinkeby
          </Button>
        </div>
        {/* <div className={classes.button}>
          <Button
            disabled
            size="large"
            color="gradient"
            variant="outlined"
            component={Link as React.FunctionComponent<Omit<LinkProps, 'color' | 'variant'>>}
            underline="none"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Feature Request
          </Button>
        </div> */}
      </div>
    </Intro>
  );
}

export { LandingIntro };
