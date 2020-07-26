import * as React from 'react';

import {
  Typography,
  Loading,
  CardContent,
  NewTable,
  TokenIcon,
  ShortAddress,
  Grid,
  FormattedAmount,
} from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { SavingsPool } from 'model/types';
import { Card } from 'app/components/Card';

export function SavingsPollsList() {
  const api = useApi();
  const [pools, poolsMeta] = useSubscribable(() => api.savings.getPools(), [api]);

  return (
    <Loading meta={poolsMeta}>
      <Grid container spacing={3}>
        {pools &&
          pools.map(pool => (
            <Grid key={pool.address} item xs={6}>
              <Pool {...pool} />
            </Grid>
          ))}
      </Grid>
    </Loading>
  );

  function Pool({ address, devName, poolToken, tokens }: SavingsPool) {
    return (
      <Card label={devName}>
        <CardContent>
          <Typography>
            Pool address: <ShortAddress address={address} />
          </Typography>
          <Typography gutterBottom>
            Pool token: <ShortAddress address={poolToken.address} />, symbol: {poolToken.symbol}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Supported tokens
          </Typography>
          <NewTable.Component
            entries={tokens}
            columns={[
              {
                renderTitle: () => 'Icon',
                cellContent: {
                  kind: 'simple',
                  render: x => <TokenIcon tokenAddress={x.address} />,
                },
              },
              {
                renderTitle: () => 'Address',
                cellContent: {
                  kind: 'simple',
                  render: x => <ShortAddress address={x.address} />,
                },
              },
              {
                renderTitle: () => 'Symbol',
                cellContent: {
                  kind: 'simple',
                  render: x => x.symbol,
                },
              },
              {
                renderTitle: () => 'Decimals',
                cellContent: {
                  kind: 'simple',
                  render: x => x.decimals,
                },
              },
              {
                renderTitle: () => 'My balance',
                cellContent: {
                  kind: 'simple',
                  render: x => <MyTokenBalance address={x.address} />,
                },
              },
            ]}
          />
        </CardContent>
      </Card>
    );
  }
}

function MyTokenBalance({ address }: { address: string }) {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribable(() => api.user.getTokenBalance(address), [
    api,
    address,
  ]);

  return <Loading meta={balanceMeta}>{balance && <FormattedAmount sum={balance} />}</Loading>;
}
