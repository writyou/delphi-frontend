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
      allocateNoApprovesWarning: 'To view the possible fees, you need to select an infinite unlock',
      allocateToOnePoolDialog: 'Are you sure you want to allocate %{amount}?',
      allocateTabText:
        'You can choose what pools to supply liquidity to and deposit in one transaction — just specify amounts & stablecoins and click Allocate!',
    },
    staking: {
      withdrawDialog: 'Are you sure you want to unstake?',
      allocateToOnePoolDialog: 'Are you sure you want to stake %{amount}?',
    },
    dca: {
      depositDialog: 'Are you sure you want to deposit?',
      changeDialog: 'investments.dcaChangeDialog',
      withdrawDialog: 'investments.dcaWithdrawDialog',
      description:
        '“DCA” into non-stablecoin pools. Higher risk-reward pools with higher volatility — higher potential capital gains and losses.',
    },
  },
  features: {
    auth: {
      applicationNetwork: 'This application works with the network "%{networkName}"',
      modalTitle: {
        connected: 'Disconnect or change wallet',
        disconnected: 'Connect wallet',
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
      'staking.deposit': {
        pending: 'Stake to staking pool. Pending',
        success: 'Stake to staking pool. Successful',
        error: 'Stake to staking pool. Failed',
      },
      'staking.withdraw': {
        pending: 'Unstake from staking pool. Pending',
        success: 'Unstake from staking pool. Successful',
        error: 'Unstake from staking pool. Failed',
      },
      'rewards.withdraw': {
        pending: 'Rewards withdrawing. Pending',
        success: 'Rewards withdrawing. Successful',
        error: 'Rewards withdrawing. Failed',
      },
    },
    transactionFinalNotification: {
      withdraw: {
        button: 'YAY!',
        title: 'Successful withdrawal!',
        textBeforeTokens: 'You have withdrawn the following tokens',
        textAfterTokens: 'to the following wallet',
        beforeLink: 'You can check the transaction hash',
        link: 'here',
        afterLink: '.',
      },
      deposit: {
        button: 'Great!',
        title: 'Successful deposit!',
        textBeforeTokens: 'Your successfully deposited the following tokens:',
        textAfterTokens: 'into the following pools:',
        beforeLink: 'Check',
        link: 'My Pool section',
        afterLink: 'for more information.',
      },
      withdrawError: {
        button: 'Damn it!',
        title: 'Withdrawal failed :(',
        text:
          'This is unfair but some awkward error occurred during transaction process. Please try again!',
        problems: `What might be the problem? Check that
        — you have enough ETH to pay gas fees;
        — you are not trying to withdraw more than you have.`,
      },
      depositError: {
        button: 'Damn it!',
        title: 'Deposit failed :(',
        text:
          'This is unfair but some awkward error occurred during transaction process. Please try again!',
        problems: `What might be the problem? Check that
        — you have enough ETH to pay gas fees;
        — you have enough tokens on your balance;
        — you did not went over your limit (shown on pool card);
        — pool did not reach TVL yet.`,
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
        42: 'Kovan Network',
      },
      networkType: {
        1: 'mainnet',
        4: 'testnet',
        42: 'testnet',
      },
    },
    infiniteApprove: {
      text:
        'Preapprove the contract to be able to spend any amount of your coins. You will not need to approve again & sign additional transactions each time.',
    },
  },
  utils: {
    validation: {
      isRequired: 'Field is required',
      moreThan: 'Should be more than %{value}',
      moreThanOrEqual: 'Should be more than or equal %{value}',
      lessThanOrEqual: 'Should be less than or equal %{value}',
      insufficientFunds: 'Insufficient funds, your balance is %{value}',
      depositLimitExceeded: 'Deposit limit exceeded, your limit is %{value}',
      notDefault: 'Value must be different from initial',
      maxStringLength: 'Text should be less than %{max} letters',
      onEnglishPlease: 'Should contain only english letters, numbers and ",.!:\'""',
      isNumber: 'Enter a valid number',
      decimalsMoreThan: 'Enter a valid number with decimals less than %{decimals} digits',
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
    modulesIntroSection: {
      savings: {
        title: 'Stablecoins',
        subtitle: 'Stay simple & stable',
        button: 'Save',
      },
      investments: {
        title: 'Volatile assets',
        subtitle: 'High risk tolerant profile',
        button: 'Invest',
      },
      dca: {
        title: 'Dollar Cost Average',
        subtitle: 'Long-term strategy for believers',
        button: 'DCA',
      },
      staking: {
        title: 'Staking & Governance',
        subtitle: 'AKRO & ADEL only',
        button: 'Stake',
      },
    },
  },
};

export { en };
