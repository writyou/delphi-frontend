import React, { useCallback } from 'react';
import { switchMap, map } from 'rxjs/operators';
import { empty, combineLatest, of } from 'rxjs';
import * as R from 'ramda';
import { Token } from '@akropolis-web/primitives';
import cn from 'classnames';

import { useCommunication, useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { SwitchInput } from 'components/inputs';
import { Loading, Label, Box, Grid } from 'components';
import { toArray } from 'utils/array';
import { makeStyles } from 'utils/styles';

type Props = {
  tokens: Token | Token[];
  spender: string;
  fontSize?: 'default' | 'inherit';
};

function getInfiniteApproves$(api: ReturnType<typeof useApi>, tokens: Token[], spender: string) {
  return api.web3Manager.account$.pipe(
    switchMap(account => {
      if (!account) return empty();

      return tokens.length
        ? combineLatest(
            tokens.map(token =>
              api.erc20.hasInfiniteApprove(token.address, account, spender).pipe(
                map(hasInfiniteApprove => ({
                  token,
                  hasInfiniteApprove,
                })),
              ),
            ),
          )
        : of([]);
    }),
  );
}

const tKeys = tKeysAll.features.infiniteApprove;

export function InfiniteApproveSwitch(props: Props) {
  const { spender, fontSize = 'default' } = props;
  const classes = useStyles();

  const { t } = useTranslate();
  // eslint-disable-next-line react/destructuring-assignment
  const tokens = toArray(props.tokens);

  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account$, [api]);

  const [tokensWithApproves, tokensWithApprovesMeta] = useSubscribable(
    () => getInfiniteApproves$(api, tokens, spender),
    [api, R.pluck('address', tokens).join(), spender],
  );

  const communication = useCommunication(
    async (checked: boolean) => {
      if (!account) return;
      if (checked) {
        await api.erc20.infiniteApproveMultiple(
          account,
          spender,
          R.pluck('token', tokensWithApproves?.filter(token => !token.hasInfiniteApprove) || []),
        );
      } else {
        await api.erc20.revertInfiniteApproveMultiple(
          account,
          spender,
          R.pluck('token', tokensWithApproves?.filter(token => token.hasInfiniteApprove) || []),
        );
      }
    },
    [api, account, tokensWithApproves],
  );

  const handleOnChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      communication.execute(checked);
    },
    [communication.execute],
  );

  const isChecked =
    (tokensWithApproves?.length && tokensWithApproves?.every(x => x.hasInfiniteApprove)) || false;
  const isDisabled =
    !tokensWithApproves?.length ||
    communication.status === 'pending' ||
    !tokensWithApprovesMeta.loaded;

  React.useDebugValue({
    isChecked,
    isDisabled,
    tokensWithApproves,
  });

  return (
    <Grid container wrap="nowrap">
      <Box mr={1} display="flex">
        <Loading
          meta={tokensWithApprovesMeta}
          communication={communication}
          progressVariant="circle"
          ignoreError
          progressProps={{ size: 20 }}
        />
      </Box>
      <SwitchInput
        disabled={isDisabled}
        checked={isChecked}
        onChange={handleOnChange}
        label={
          <Label hint={t(tKeys.text.getKey())}>
            <span
              className={cn({
                [classes.label]: fontSize === 'default',
                [classes.fontSizeInherit]: fontSize === 'inherit',
              })}
            >
              Infinite unlock
            </span>
          </Label>
        }
      />
    </Grid>
  );
}

const useStyles = makeStyles(
  {
    fontSizeInherit: {
      fontSize: 'inherit',
    },
    label: {
      fontSize: '1rem',
    },
  },
  { name: 'InfiniteApproveSwitch' },
);
