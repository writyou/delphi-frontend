import * as React from 'react';

import { Typography, CardContent, NewTable, TokenIcon, ShortAddress, Divider } from 'components';
import { SavingsPool } from 'model/types';
import { Card } from 'app/components/Card';

import { MyTokenBalance } from './MyTokenBalance';
import { DepositToPoolForm } from './DepositToPoolForm';

export function Pool({ address, devName, poolToken, tokens }: SavingsPool) {
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
        <Divider />
        <DepositToPoolForm poolAddress={address} supportedTokens={tokens} />
      </CardContent>
    </Card>
  );
}
