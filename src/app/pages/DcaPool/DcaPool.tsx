import * as React from 'react';

import { Header } from 'app/components/LandingHeader/Header';
import { Footer } from 'app/components/Footer/Footer';
import { Layout, Benefits } from 'components';

import { DcaPoolIntro } from './Intro/Intro';
import { benefits } from './constants';
import { useStyles } from './DcaPool.styles';

function DcaPool() {
  const classes = useStyles();

  return (
    <Layout>
      <Layout.Header>
        <Header forLanding customNavItems={[]} />
      </Layout.Header>
      <Layout.Container className={classes.main}>
        <DcaPoolIntro />
        <Benefits className={classes.benefits} benefits={benefits} />
      </Layout.Container>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export { DcaPool };
