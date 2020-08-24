import React from 'react';
import { TokenAmount, Token } from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { Table, FormattedAmount, Grid, TokenName, Loading } from 'components';
import { Cat2, CatPaws } from 'components/icons';
import { liquidityAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';
import { useSubscribableDeprecated } from 'utils/react';
import { ETH_NETWORK_CONFIG } from 'env';
import { RewardData } from 'model/types';

const AKRO = new Token(ETH_NETWORK_CONFIG.tokens.AKRO.toLowerCase(), 'AKRO', 18);
const ADEL = new Token(ETH_NETWORK_CONFIG.tokens.ADEL.toLowerCase(), 'ADEL', 18);
const BAL = new Token(ETH_NETWORK_CONFIG.tokens.BAL.toLowerCase(), 'BAL', 18);
const COMP = new Token(ETH_NETWORK_CONFIG.tokens.COMP.toLowerCase(), 'COMP', 18);
const CRV = new Token(ETH_NETWORK_CONFIG.tokens.CRV.toLowerCase(), 'CRV', 18);
const SNX = new Token(ETH_NETWORK_CONFIG.tokens.SNX.toLowerCase(), 'SNX', 18);
const MTA = new Token(ETH_NETWORK_CONFIG.tokens.MTA.toLowerCase(), 'MTA', 18);
const YFI = new Token(ETH_NETWORK_CONFIG.tokens.YFI.toLowerCase(), 'YFI', 18);

// TODO get current supported reward tokens from contracts
const dataMock: RewardData[] = [AKRO, ADEL, BAL, COMP, CRV, SNX, MTA, YFI].map(token => ({
  amount: new TokenAmount(0, token),
  NAV: liquidityAmount,
}));

const columnsWithoutExpandableRows: Array<Table.models.Column<RewardData>> = [
  {
    renderTitle: () => 'Asset',
    cellContent: {
      kind: 'simple',
      render: x => <TokenName token={x.amount.currency} />,
    },
  },

  {
    renderTitle: () => 'Amount',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.amount} variant="plain" hideSymbol />,
    },
  },

  {
    renderTitle: () => 'NAV',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.NAV} variant="plain" />,
    },
  },
];

export function RewardsTable() {
  const classes = useStyles();
  const api = useApi();
  const [data, meta] = useSubscribableDeprecated(() => api.user.getRewardsData$(), [api]);

  return (
    <Loading meta={meta}>
      {data && data.length ? (
        <Table.Component rowPadding="small" columns={columnsWithoutExpandableRows} entries={data} />
      ) : (
        <Grid container>
          <Grid item xs={4}>
            <Table.Component
              rowPadding="small"
              columns={[columnsWithoutExpandableRows[0]]}
              entries={dataMock}
            />
          </Grid>
          <Grid item xs={8}>
            <Table.Component
              rowPadding="small"
              columns={[columnsWithoutExpandableRows[1], columnsWithoutExpandableRows[2]]}
              entries={[]}
            />
            <Cat2 className={classes.cat} />
            <p>
              No harvest to check — you withdrawn everything.
              <CatPaws className={classes.catPaws} />
            </p>
            <p>Chill with Delphic while your crops are getting ready to grow.</p>
          </Grid>
        </Grid>
      )}
    </Loading>
  );
}

const useStyles = makeStyles(
  () => ({
    cat: {
      width: '80%',
      height: 'auto',
      marginTop: 42,
    },
    catPaws: {
      display: 'inline-block',
      fontSize: 40,
      height: 20,
      verticalAlign: 'bottom',
      marginLeft: 6,
    },
  }),
  { name: 'RewardsTable' },
);
