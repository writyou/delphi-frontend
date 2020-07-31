import React, { useCallback } from 'react';
import { switchMap } from 'rxjs/operators';
import { never, combineLatest } from 'rxjs';
import R from 'ramda';

import { useCommunication, useSubscribable } from 'utils/react';
import { Token } from 'model/entities';
import { useApi } from 'services/api';
import { SwitchInput } from 'components/inputs';
import { Loading } from 'components';

type Props = {
  tokens: Token[];
  spender: string;
};

export function InfiniteApproveSwitch(props: Props) {
  const { tokens, spender } = props;

  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account$, [api]);

  const onConfirm = useCallback(
    async (checked: boolean) => {
      if (!account) return;
      if (checked) {
        await api.erc20.infiniteApproveMultiple(
          account,
          spender,
          R.pluck('token', tokensWithApproves?.filter(token => !token.hasInfinity) || []),
        );
      } else {
        await api.erc20.revertInfiniteApproveMultiple(
          account,
          spender,
          R.pluck('token', tokensWithApproves?.filter(token => token.hasInfinity) || []),
        );
      }
    },
    [api],
  );

  const communication = useCommunication(onConfirm, []);

  const [tokensWithApproves, tokensWithApprovesMeta] = useSubscribable(
    () => getInfinityApproves$(api, tokens, spender),
    [api, tokens, spender],
  );

  const isChecked = tokensWithApproves?.every(x => x.hasInfinity) || false;

  const handleOnChange = useCallback((_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    communication.execute(checked);
  }, []);

  return (
    <>
      <Loading meta={tokensWithApprovesMeta} progressVariant="circle" ignoreError />
      <SwitchInput
        disabled={communication.status === 'pending' || !tokensWithApprovesMeta.loaded}
        checked={isChecked}
        onChange={handleOnChange}
      />
    </>
  );
}

function getInfinityApproves$(api: ReturnType<typeof useApi>, tokens: Token[], spender: string) {
  return api.web3Manager.account$.pipe(
    switchMap(account =>
      account
        ? combineLatest([
            tokens.map(token => ({
              token,
              hasInfinity: api.erc20.hasInfinityApprove(token.address, account, spender),
            })),
          ])
        : never(),
    ),
  );
}
