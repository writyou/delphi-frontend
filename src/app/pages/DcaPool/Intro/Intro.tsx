import React from 'react';

import { Button, Link, LinkProps, Intro } from 'components';

import { DcaPoolIcon, DelphiTextLogo } from '../Icons';
import { useStyles } from './Intro.styles';
import { DCA_LINK } from '../constants';

function DcaPoolIntro() {
  const classes = useStyles();

  return (
    <Intro
      icon={
        <>
          <DcaPoolIcon fontSize="inherit" />
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
            size="large"
            color="primary"
            variant="outlined"
            component={Link as React.FunctionComponent<Omit<LinkProps, 'color' | 'variant'>>}
            underline="none"
            href="https://docs.google.com/forms/d/1OcvOT-zSG2brjjoR1F_yZiswg8DkNOcRNumitqcoGS4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Waitlist
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

export { DcaPoolIntro };
