import React, { useCallback, useMemo } from 'react';
import { combineLatest, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Token } from '@akropolis-web/primitives';
import * as R from 'ramda';
import { FormSpy } from 'react-final-form';

import { useApi } from 'services/api';
import { SwitchInputField } from 'components/form';
import { useSubscribable, useCommunication } from 'utils/react';
import { isSuccess } from 'utils/remoteData';
import { Table } from 'components';
import { ETH_NETWORK_CONFIG } from 'env';

import { getInfiniteApproves$ } from '../view/InfiniteApproveSwitch';
import { InfiniteApproveFormTemplate } from './InfiniteApproveFormTemplate';
import * as tableData from './tableData';

type FormData = TokenToApprove[];

type TokenToApprove = {
  token: Token;
  hasInfiniteApprove: boolean;
};

type InfiniteApproveFormProps = {
  tokens: Token[];
};

export function TokensInfiniteApproveForm({ tokens }: InfiniteApproveFormProps) {
  const api = useApi();

  const tokensRD = useSubscribable(
    () =>
      combineLatest(
        combineLatest(
          Object.values(tokens).map(({ address }) => {
            try {
              return api.erc20.getToken$(address).pipe(catchError(() => of(null)));
            } catch {
              return of(null);
            }
          }),
        ),
        api.web3Manager.account$,
      ).pipe(
        map(([receivedTokens, account]) => ({
          receivedTokens: receivedTokens.filter((value): value is Token => !!value),
          account,
        })),
        switchMap(({ receivedTokens, account }) =>
          getInfiniteApproves$(
            api,
            receivedTokens,
            ETH_NETWORK_CONFIG.contracts.savingsModule,
          ).pipe(map(values => ({ account, validTokens: values }))),
        ),
      ),
    [api],
  );

  // TODO refactor
  const { account, validTokens } =
    tokensRD.fold(
      () => undefined,
      () => undefined,
      () => undefined,
      val => val,
    ) || {};

  const initialValues: FormData | undefined = useMemo(() => validTokens, [validTokens]);

  const handleFormSubmit = useCallback(async (tokensState: FormData) => {
    if (!tokensState) return;

    await communication.execute(tokensState);
  }, []);

  const communication = useCommunication(
    async (tokensState: FormData) => {
      if (!tokensState || !account) return;
      await api.erc20.infiniteApproveMultiple(
        account,
        ETH_NETWORK_CONFIG.contracts.savingsModule,
        R.pluck('token', validTokens?.filter(token => !token.hasInfiniteApprove) || []),
      );
      await api.erc20.revertInfiniteApproveMultiple(
        account,
        ETH_NETWORK_CONFIG.contracts.savingsModule,
        R.pluck('token', validTokens?.filter(token => token.hasInfiniteApprove) || []),
      );
    },
    [api, account, validTokens],
  );

  const isDisabled = communication.status === 'pending' || !isSuccess(tokensRD);

  return (
    <InfiniteApproveFormTemplate<FormData>
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      submitButton="Confirm"
    >
      <FormSpy<FormData> subscription={{ values: true }}>
        {({ values }) => (
          <>
            {values.length && (
              <>
                <Table.Component
                  rowPadding="small"
                  columns={tableData.columns}
                  entries={values.map(currentToken => ({
                    token: currentToken.token,
                    switch: renderApproveSwitch(currentToken),
                  }))}
                />
                Grant infinite unlock rights for all
                <SwitchInputField
                  disabled={isDisabled}
                  name="switchAll"
                  checked={values.every(currentToken => currentToken.hasInfiniteApprove)}
                />
              </>
            )}
          </>
        )}
      </FormSpy>
    </InfiniteApproveFormTemplate>
  );

  function renderApproveSwitch(currentToken: TokenToApprove) {
    return (
      <>
        <SwitchInputField
          disabled={isDisabled}
          key={currentToken.token.symbol}
          name={currentToken.token.symbol}
          checked={currentToken.hasInfiniteApprove}
        />
      </>
    );
  }
}
