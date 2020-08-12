import * as React from 'react';

import { Typography, Table, TokenIcon, ShortAddress, Divider, Card } from 'components';
import { SavingsPool } from 'model/types';

import { MyTokenBalance } from './MyTokenBalance';
import { DepositToPoolForm } from './DepositToPoolForm';

export function Pool({ address, poolName, poolToken, tokens }: SavingsPool) {
  return (
    <Card label={poolName}>
      <Typography>
        Pool address: <ShortAddress withIcon address={address} />
      </Typography>
      <Typography gutterBottom>
        Pool token: <ShortAddress address={poolToken.address} />, symbol: {poolToken.symbol}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Supported tokens
      </Typography>
      <Table.Component
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
      <Divider />
      <DepositToPoolForm poolAddress={address} supportedTokens={tokens} />
    </Card>
  );
}
