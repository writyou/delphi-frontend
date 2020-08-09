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
      copyright: 'Delphi v0.1-alpha by Akropolis Decentralised Ltd',
    },
    savings: {
      mySupplyBalance: 'My Supply Balance',
      poolLiquidity: 'Pool Liquidity',
      viewDetails: 'View Details',
      withdraw: 'Withdraw',
      withdrawDialog: 'Are you sure you want to withdraw?',
      withdrawTabText:
        'If you want to withdraw liquidity, simply choose the pool and amount you want to withdraw',
      allocate: 'Allocate',
      allocateDialog: 'Are you sure you want to allocate?',
      allocateNoApprovesWarning:
        'to view the fees on the commission, you need to select an infinite unlock',
      allocateToOnePoolDialog: 'Are you sure you want to allocate %{amount}?',
      allocateTabText:
        'You can choose what pools to supply liquidity to and deposit in one transaction — just specify amounts & stablecoins and click Allocate!',
    },
    investments: {
      dcaDepositDialog: 'Are you sure you want to deposit?',
      dcaChangeDialog: 'investments.dcaChangeDialog',
      dcaWithdrawDialog: 'investments.dcaWithdrawDialog',
      dcaTabText:
        '“All-in” or “DCA” into non-stablecoin pools. Higher risk-reward pools with higher volatility — higher potential capital gains and losses.',
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
      'testnetERC20.mint': {
        pending: 'Minting %{amount}. Pending',
        success: 'Minting %{amount}. Successful',
        error: 'Minting %{amount}. Failed',
      },
      'erc20.approve': {
        pending: 'Approving %{amount} transfer. Pending',
        success: 'Approving %{amount} transfer. Successful',
        error: 'Approving %{amount} transfer. Failed',
      },
      'erc20.revertApprove': {
        pending: 'Reverting approve for infinite transfers %{symbol}. Pending',
        success: 'Reverting approve for infinite transfers %{symbol}. Successful',
        error: 'Reverting approve for infinite transfers %{symbol}. Failed',
      },
      'erc20.infiniteApprove': {
        pending: 'Approving infinite transfers %{symbol}. Pending',
        success: 'Approving infinite transfers %{symbol}. Successful',
        error: 'Approving infinite transfers %{symbol}. Failed',
      },
      'savings.deposit': {
        pending: 'Deposit to savings pool. Pending',
        success: 'Deposit to savings pool. Successful',
        error: 'Deposit to savings pool. Failed',
      },
      'savings.withdraw': {
        pending: 'Withdraw %{amount} from savings pool. Pending',
        success: 'Withdraw %{amount} from savings pool. Successful',
        error: 'Withdraw %{amount} from savings pool. Failed',
      },
      'savings.withdrawAll': {
        pending: 'Withdraw %{amount} from savings pool. Pending',
        success: 'Withdraw %{amount} from savings pool. Successful',
        error: 'Withdraw %{amount} from savings pool. Failed',
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
