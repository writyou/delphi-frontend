// tslint:disable:max-line-length
const en = {
  app: {
    mainTitle: 'Sparta',
    connectingWarning: 'You need connect to wallet',
    pages: {},
    components: {},
  },
  modules: {
    navigation: {
      products: 'Product',
      company: 'Company',
      tutorials: 'Tutorials',
      wiki: 'Wiki',
      app: 'App',
      roadmap: 'Roadmap',
      whitepaper: 'Whitepaper',
      events: 'Events',
      blog: 'Blog',
      quest: 'Quest',
      cashflowRelay: 'Cashflow Relay',
      chamaNetwork: 'Akropolis Network',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      pointSystem: 'Point System',
      statistics: 'Statistics',
      governance: 'Governance',
      account: 'Account',
      lend: 'Lend',
      borrow: 'Borrow',
      liquidations: 'Liquidations',
      history: 'History',
      copyright: 'Sparta v1.0 by Akropolis Decentralised Ltd',
    },
    savings: {
      mySupplyBalance: 'My Supply Balance',
      poolLiquidity: 'Pool Liquidity',
      viewDetails: 'View Details',
      allocate: 'Allocate',
      allocateDialog: 'Are you sure you want to allocate?',
      allocateTabText:
        'You can choose what pools to supply liquidity to and deposit in one transaction - just specify amounts & stablecoins and click Allocate!',
    },
  },
  features: {
    auth: {
      applicationNetwork: 'This application works with the network "%{networkName}"',
      modalTitle: {
        connected: 'Disconnect or change wallet:',
        disconnected: 'Choose your wallet:',
        connectedTo: 'Connected to',
        disconnect: 'Disconnect',
      },
      connect: 'Connect to wallet',
    },
    notifications: {
      'erc20.approve': {
        pending: 'Approving %{amount} transfer. Pending',
        success: 'Approving %{amount} transfer. Successful',
        error: 'Approving %{amount} transfer. Failed',
      },
      'savings.deposit': {
        pending: 'Deposit to savings pool. Pending',
        success: 'Deposit to savings pool. Successful',
        error: 'Deposit to savings pool. Failed',
      },
    },
    networkWarning: {
      title: 'You are connected to the wrong network',
      warning:
        'You are connected to the wrong network. Please choose %{name} to proceed to %{type}',
      disconnectButton: 'Disconnect',
      networkName: {
        1: 'Main Ethereum Network',
        4: 'Rinkeby Network',
      },
      networkType: {
        1: 'mainnet',
        4: 'testnet',
      },
    },
  },
  utils: {
    validation: {
      isRequired: 'Field is required',
      moreThen: 'Should be more then %{value}',
      moreThenOrEqual: 'Should be more then or equal %{value}',
      lessThenOrEqual: 'Should be less then or equal %{value}',
      insufficientFunds: 'Insufficient funds, your balance is %{value}',
      notDefault: 'Value must be different from initial',
      maxStringLength: 'Text should be less then %{max} letters',
      onEnglishPlease: 'Should contain only english letters, numbers and ",.!:\'""',
      isNumber: 'Enter a valid number',
      decimalsMoreThen: 'Enter a valid number with decimals less than %{decimals} digits',
      mustBeAnInteger: 'Enter an integer',
      isPositiveNumber: 'Must be positive number',
    },
  },
  components: {
    pagination: {
      itemsPerPage: 'Items per page',
      currentPagination: '%{from} - %{to} of %{total}',
      currentSubgraphPagination: '%{from} - %{to}',
    },
    poolBalanceChart: {
      ptkDepositPrice: 'ASPT Deposit Price',
      ptkWithdrawalPrice: 'ASPT Withdrawal Price',
    },
    poolCompositionChart: {
      poolComposition: 'Pool Composition',
    },
    availableLoansChart: {
      totalAvailable: 'Total Available for Loans',
    },
    deFiScoreChart: {
      deFiScore: 'DeFi Score',
    },
  },
};

export { en };
