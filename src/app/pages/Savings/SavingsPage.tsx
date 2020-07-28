import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { TabsList, TabContext, Tab, TabPanel, Loading, Grid } from 'components';
import { SwitchInput } from 'components/inputs';
import { liquidityAmount } from 'utils/mock';

import { Card, WithViewDetails } from './Card/Card';
import { DepositToPoolForm } from '../Demo/components/DepositToPoolForm';

export function SavingsPage() {
  const match = useRouteMatch<{ page: string }>('/savings/:page');
  const [selectedPage, setSelectedPage] = React.useState('allocate');

  const page = match ? match.params.page : 'allocate';

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: string) => {
    setSelectedPage(tab);
  };

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  const classes = useStyles();

  return renderTabs();

  function renderTabs() {
    const api = useApi();
    const [pools, poolsMeta] = useSubscribable(() => api.savings.getPools$(), [api]);
    return (
      <Grid className={classes.root}>
        <TabContext value={selectedPage}>
          <div className={classes.navigationBar}>
            <TabsList value={selectedPage} className={classes.tabs} onChange={handleTabChange}>
              <Tab
                label="Allocate"
                className={classes.tab}
                component={Link}
                value={routes.savings.allocate.getElementKey()}
                to={routes.savings.allocate.getRedirectPath()}
              />
              <Tab
                label="Withdraw"
                className={classes.tab}
                component={Link}
                value={routes.savings.withdraw.getElementKey()}
                to={routes.savings.withdraw.getRedirectPath()}
              />
            </TabsList>
          </div>
          <TabPanel value={routes.savings.allocate.getElementKey()}>
            <Loading meta={poolsMeta}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
              >
                {pools &&
                  pools.map(pool => (
                    <Grid item>
                      <Card
                        title="Compound"
                        balanceAmount={liquidityAmount}
                        liquidityAmount={liquidityAmount}
                        tokens={pool.tokens}
                        footerElement={
                          <WithViewDetails
                            getLink={() => '123'}
                            allocateSwitcher={<span><SwitchInput />Allocate</span>}
                            additionalElement={
                              <DepositToPoolForm poolAddress={pool.address} supportedTokens={pool.tokens} />
                            }
                          />
                        }
                      />
                    </Grid>
                  ))}
                <Grid item>
                  <Card title="Y Curve" balanceAmount={liquidityAmount} liquidityAmount={liquidityAmount} tokens={[]} />
                </Grid>
                <Grid item>
                  <Card title="Compound" balanceAmount={liquidityAmount} liquidityAmount={liquidityAmount} tokens={[]} />
                </Grid>
              </Grid>
            </Loading>
          </TabPanel>
          <TabPanel value={routes.savings.withdraw.getElementKey()}>
            Withdraw not implemented
          </TabPanel>
        </TabContext>
      </Grid>
    );
  }
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: '50px 60px',
    },
    tabs: {
      marginBottom: 40,
    },
    tab: {
      minWidth: 112,
    },
    navigationBar: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    cardsContainer: {
      paddingTop: 60,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      flexWrap: 'wrap',
    },
    cardWrapper: {
      margin: '0px 20px 40px 0',
    },
  }),
  { name: 'SavingsPage' },
);
