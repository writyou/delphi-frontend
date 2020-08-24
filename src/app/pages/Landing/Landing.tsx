import * as React from 'react';

import { Header } from 'app/components/LandingHeader/Header';
import { Footer } from 'app/components/Footer/Footer';
import { Layout, Benefits } from 'components';

import { LandingIntro } from './Intro/Intro';
import { benefits } from './constants';
import { useStyles } from './Landing.styles';

function Landing() {
  const classes = useStyles();

  return (
    <Layout>
      <Layout.Header>
        <Header customNavItems={[]} />
      </Layout.Header>
      <Layout.Socials />
      <Layout.Container className={classes.main}>
        <LandingIntro />
        <Benefits className={classes.benefits} benefits={benefits} />
      </Layout.Container>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export { Landing };
