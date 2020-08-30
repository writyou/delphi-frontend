import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { DependencyProvider } from '@akropolis-web/components';

import { ETH_NETWORK_CONFIG } from 'env';
import { App } from 'app/App';
import { routes } from 'app/routes';
import { ErrorBoundary, Snackbar, CssBaseline } from 'components';
import { Api, ApiContext } from 'services/api';
import { ApolloProvider } from 'services/apollo';
import { I18nProvider } from 'services/i18n';
import { ThemeProvider } from 'services/theme';
import { AuthProvider } from 'services/auth/';
import { AdaptabilityProvider } from 'services/adaptability';
import { NetworkWarning } from 'features/networkWarning';
import { TransactionsNotifications } from 'features/transactionsNotifications';
import { TransactionFinalNotification } from 'features/transactionFinalNotification';

export function Root(): React.ReactElement<{}> {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ApolloProvider>
          <ApiWrapper />
        </ApolloProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

function ApiWrapper() {
  const apolloClient = useApolloClient();

  const api = new Api(apolloClient);

  if (process.env.NODE_ENV === 'development') {
    (window as any).api = api;
  }

  return (
    <ApiContext.Provider value={api}>
      <DependencyProvider supportedTokens={ETH_NETWORK_CONFIG.tokens}>
        <I18nProvider>
          <ThemeProvider>
            <Snackbar>
              <AdaptabilityProvider>
                <AuthProvider
                  web3Manager={api.web3Manager}
                  disconnectRedirectPath={routes.summary.getRedirectPath()}
                >
                  <CssBaseline />
                  <App />
                  <TransactionsNotifications />
                  <TransactionFinalNotification />
                  <NetworkWarning />
                </AuthProvider>
              </AdaptabilityProvider>
            </Snackbar>
          </ThemeProvider>
        </I18nProvider>
      </DependencyProvider>
    </ApiContext.Provider>
  );
}
