import React, { useCallback, useMemo } from 'react';
import { combineLatest, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Token } from '@akropolis-web/primitives';
import * as R from 'ramda';
import { FormSpy } from 'react-final-form';
import { makeStyles } from '@akropolis-web/styles';

import { useApi } from 'services/api';
import { SwitchInputField } from 'components/form';
import { useSubscribable, useCommunication } from 'utils/react';
import { isSuccess } from 'utils/remoteData';
import { Grid, TokenIcon, Loading } from 'components';
import { ETH_NETWORK_CONFIG } from 'env';

import { getInfiniteApproves$ } from '../view/InfiniteApproveSwitch';
import { InfiniteApproveFormTemplate } from './InfiniteApproveFormTemplate';
import { SwitchAllTokens } from './SwitchAllTokens';

type FormData = {
  [x: string]: boolean;
};

type TokenToApprove = {
  token: Token;
  hasInfiniteApprove: boolean;
};

type InfiniteApproveFormProps = {
  tokens: Token[];
};

export function TokensInfiniteApproveForm({ tokens }: InfiniteApproveFormProps) {
  const api = useApi();
  const classes = useStyles();

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
          ).pipe(map(values => ({ account, receivedTokens: values }))),
        ),
      ),
    [api],
  );

  // TODO refactor
  const { account, receivedTokens } =
    tokensRD.fold(
      () => undefined,
      () => undefined,
      () => undefined,
      val => val,
    ) || {};

  const initialValues = useMemo(
    () =>
      receivedTokens &&
      R.mergeAll(receivedTokens.map(data => ({ [data.token.symbol]: data.hasInfiniteApprove }))),
    [receivedTokens],
  );

  const handleFormSubmit = useCallback(
    async (tokensFormState: FormData) => {
      if (!tokensFormState) return;

      await communication.execute(tokensFormState);
    },
    [receivedTokens],
  );

  const communication = useCommunication(
    async (tokensFormState: FormData) => {
      if (!tokensFormState || !account) return;
      await api.erc20.infiniteApproveMultiple(
        account,
        ETH_NETWORK_CONFIG.contracts.savingsModule,
        R.pluck(
          'token',
          receivedTokens?.filter(
            token =>
              tokensFormState[token.token.symbol] &&
              tokensFormState[token.token.symbol] !== token.hasInfiniteApprove,
          ) || [],
        ),
      );
      await api.erc20.revertInfiniteApproveMultiple(
        account,
        ETH_NETWORK_CONFIG.contracts.savingsModule,
        R.pluck(
          'token',
          receivedTokens?.filter(
            token =>
              !tokensFormState[token.token.symbol] &&
              tokensFormState[token.token.symbol] !== token.hasInfiniteApprove,
          ) || [],
        ),
      );
    },
    [api, account, receivedTokens],
  );

  const isDisabled = communication.status === 'pending' || !isSuccess(tokensRD);

  return (
    <Loading data={tokensRD}>
      {tokensData => (
        <InfiniteApproveFormTemplate<FormData>
          onSubmit={handleFormSubmit}
          submitButton="Confirm"
          initialValues={initialValues}
          FooterContent={InfiniteApproveFooterContent}
        >
          {renderInfiniteApproveTable(tokensData.receivedTokens)}
        </InfiniteApproveFormTemplate>
      )}
    </Loading>
  );

  // TODO: refactor when table component will be more customizable
  function renderInfiniteApproveTable(values: TokenToApprove[]) {
    return (
      <>
        <Grid container item className={classes.headerRow}>
          <Grid item xs={4}>
            Asset
          </Grid>
          <Grid item xs={8}>
            Infinite Unlock
          </Grid>
        </Grid>
        <Grid container item>
          {values.map(({ token }) => (
            <Grid item container className={classes.row}>
              <Grid item container xs={4}>
                <Grid item className={classes.tokenIcon}>
                  <TokenIcon tokenAddress={token.address} />
                </Grid>
                <Grid item>{token.symbol}</Grid>
              </Grid>
              <Grid item xs={8}>
                {renderApproveSwitch(token)}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  function InfiniteApproveFooterContent(props: { SubmitButton: () => JSX.Element }) {
    const { SubmitButton } = props;
    return (
      <Grid container item alignItems="center" className={classes.footerRow}>
        <Grid item xs={4}>
          Grant infinite unlock rights for all
        </Grid>
        <Grid container item xs={8} alignItems="center">
          <Grid item className={classes.switch}>
            <FormSpy<FormData> subscription={{ values: true }}>
              {({ values, form }) => (
                <SwitchAllTokens form={form} tokens={values} isDisabled={isDisabled} />
              )}
            </FormSpy>
          </Grid>
          <Grid item>
            <SubmitButton />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function renderApproveSwitch(token: Token) {
    return (
      <>
        <SwitchInputField disabled={isDisabled} key={token.symbol} name={token.symbol} />
      </>
    );
  }
}

const useStyles = makeStyles(
  {
    headerRow: {
      paddingBottom: 22,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    row: {
      fontWeight: 300,
      marginTop: 27,
      '&:first-of-type': {
        marginTop: 30,
      },
      '&:last-of-type': {
        marginBottom: 19,
      },
    },
    footerRow: {
      paddingTop: 27,
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      fontWeight: 300,
    },
    tokenIcon: {
      marginRight: 12,
    },
    switch: {
      marginRight: 50,
    },
  },
  { name: 'InfiniteApproveTable' },
);
