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
import { tKeys, useTranslate } from 'services/i18n';

import { getInfiniteApproves$ } from '../view/InfiniteApproveSwitch';
import { InfiniteApproveFormTemplate, SubmitButtonProps } from './InfiniteApproveFormTemplate';
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

export function TokensInfiniteApproveForm({ tokens: initialTokens }: InfiniteApproveFormProps) {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();

  const tokensRD = useSubscribable(
    () =>
      combineLatest(
        combineLatest(
          Object.values(initialTokens).map(({ address }) => {
            try {
              return api.erc20.getToken$(address).pipe(catchError(() => of(null)));
            } catch {
              return of(null);
            }
          }),
        ),
        api.web3Manager.account$,
      ).pipe(
        map(([tokens, account]) => ({
          verifiedTokens: tokens.filter((value): value is Token => !!value),
          account,
        })),
        switchMap(({ verifiedTokens, account }) =>
          getInfiniteApproves$(
            api,
            verifiedTokens,
            ETH_NETWORK_CONFIG.contracts.savingsModule,
          ).pipe(map(tokens => ({ account, receivedTokens: tokens }))),
        ),
      ),
    [api],
  );

  const { account, receivedTokens } = tokensRD.toUndefined() || {};

  const initialValues = useMemo(
    () =>
      receivedTokens &&
      R.mergeAll(receivedTokens.map(data => ({ [data.token.symbol]: data.hasInfiniteApprove }))),
    [receivedTokens],
  );

  const handleFormSubmit = useCallback(
    async (tokens: FormData) => {
      if (!tokens) return;

      await communication.execute(tokens);
    },
    [receivedTokens],
  );

  const getChangedTokens = useCallback(
    (tokensState: FormData, direction: 'approve' | 'revert') =>
      receivedTokens?.filter(
        token =>
          (direction === 'approve'
            ? tokensState[token.token.symbol]
            : !tokensState[token.token.symbol]) &&
          tokensState[token.token.symbol] !== token.hasInfiniteApprove,
      ),
    [receivedTokens],
  );

  const communication = useCommunication(
    async (tokens: FormData) => {
      if (!tokens || !account) return;
      await api.erc20.infiniteApproveMultiple(
        account,
        ETH_NETWORK_CONFIG.contracts.savingsModule,
        R.pluck('token', getChangedTokens(tokens, 'approve') || []),
      );
      await api.erc20.revertInfiniteApproveMultiple(
        account,
        ETH_NETWORK_CONFIG.contracts.savingsModule,
        R.pluck('token', getChangedTokens(tokens, 'revert') || []),
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
            {t(tKeys.features.infiniteApprove.tokensTableHeader.asset.getKey())}
          </Grid>
          <Grid item xs={8}>
            {t(tKeys.features.infiniteApprove.tokensTableHeader.unlock.getKey())}
          </Grid>
        </Grid>
        <Grid container item>
          {values.map(({ token }) => (
            <Grid item container key={token.symbol} className={classes.row}>
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

  function InfiniteApproveFooterContent(props: {
    SubmitButton: (props: SubmitButtonProps) => JSX.Element;
  }) {
    const { SubmitButton } = props;
    return (
      <Grid container item alignItems="center" className={classes.footerRow}>
        <Grid item xs={4}>
          {t(tKeys.features.infiniteApprove.switchAllText.getKey())}
        </Grid>
        <FormSpy<FormData> subscription={{ values: true }}>
          {({ values, form }) => {
            return (
              <Grid container item xs={8} alignItems="center">
                <Grid item className={classes.switch}>
                  <SwitchAllTokens form={form} tokens={values} isDisabled={isDisabled} />
                </Grid>
                <Grid item>
                  <SubmitButton
                    disabled={
                      !getChangedTokens(values, 'approve')?.length &&
                      !getChangedTokens(values, 'revert')?.length
                    }
                  />
                </Grid>
              </Grid>
            );
          }}
        </FormSpy>
      </Grid>
    );
  }

  function renderApproveSwitch(token: Token) {
    return <SwitchInputField disabled={isDisabled} key={token.symbol} name={token.symbol} />;
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
