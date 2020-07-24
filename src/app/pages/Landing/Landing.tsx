import * as React from 'react';

import { Header } from 'app/components/LandingHeader/Header';
import { Footer } from 'app/components/Footer/Footer';
import { Layout, Benefits } from 'components';
import { tKeys, useTranslate } from 'services/i18n';

import { LandingIntro } from './Intro/Intro';
import { benefits } from './constants';
import { useStyles } from './Landing.styles';

function Landing() {
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Layout>
      <Layout.Header>
        <Header authButtonText={t(tKeys.modules.navigation.app.getKey())} customNavItems={[]} />
      </Layout.Header>
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
