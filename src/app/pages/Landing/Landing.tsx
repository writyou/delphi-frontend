import * as React from 'react';

import { Layout, Benefits } from 'components';
import { Header } from 'app/components/LandingHeader/Header';
import { Footer } from 'app/components/Footer/Footer';
import { makeStyles } from 'utils/styles';

import { LandingIntro } from './Intro/Intro';
import { benefits, footerNavItems } from './constants';

export function Landing() {
  const classes = useStyles();
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Container>
        <LandingIntro />
        <Benefits benefits={benefits} className={classes.section} />
      </Layout.Container>
      <Layout.Footer>
        <Footer customNavItems={footerNavItems} />
      </Layout.Footer>
    </Layout>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.colors.athensGray : theme.colors.obsidian,
    },
  },

  section: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.up('tabletSM')]: {
      marginTop: theme.spacing(7.5),
    },

    '&:last-child': {
      marginBottom: theme.spacing(3.75),
      [theme.breakpoints.up('tabletSM')]: {
        marginBottom: theme.spacing(7.5),
      },
    },
  },
}));
