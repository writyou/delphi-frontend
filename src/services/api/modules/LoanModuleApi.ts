import { Observable, BehaviorSubject, of, combineLatest, timer } from 'rxjs';
import { map, first as firstOperator, switchMap } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';
import PromiEvent from 'web3/promiEvent';

import { min, bnToBn, max, decimalsToWei } from 'utils/bn';
import { memoize } from 'utils/decorators';
import {
  createLoanModule,
  createLoanLimitsModule,
  createLoanProposalsModule,
} from 'generated/contracts';
import {
  ETH_NETWORK_CONFIG,
  MIN_COLLATERAL_PERCENT_FOR_BORROWER,
  PLEDGE_MARGIN_DIVIDER,
} from 'env';
import { RepaymentMethod } from 'model/types';
import { calcWithdrawAmountBeforeFee } from 'model';
import { TokenAmount, LiquidityAmount } from 'model/entities';
import { getCurrentValueOrThrow } from 'utils/rxjs';

import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';
import { Erc20Api } from './Erc20Api';
import { FundsModuleApi } from './FundsModuleApi';
import { SwarmApi } from './SwarmApi';
import { CurveModuleApi } from './CurveModuleApi';

function first<T>(input: Observable<T>): Promise<T> {
  return input.pipe(firstOperator()).toPromise();
}

export class LoanModuleApi {
  public readonlyContracts: {
    loan: Contracts['loanModule'];
    limits: Contracts['loanLimitsModule'];
    proposals: Contracts['loanProposalsModule'];
  };

  private txContracts = {
    loan: new BehaviorSubject<null | Contracts['loanModule']>(null),
    limits: new BehaviorSubject<null | Contracts['loanLimitsModule']>(null),
    proposals: new BehaviorSubject<null | Contracts['loanProposalsModule']>(null),
  };

  constructor(
    private web3Manager: Web3ManagerModule,
    private erc20Api: Erc20Api,
    private transactionsApi: TransactionsApi,
    private fundsModuleApi: FundsModuleApi,
    private swarmApi: SwarmApi,
    private curveModuleApi: CurveModuleApi,
  ) {
    this.readonlyContracts = {
      loan: createLoanModule(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.loanModule),
      limits: createLoanLimitsModule(
        this.web3Manager.web3,
        ETH_NETWORK_CONFIG.contracts.loanLimitsModule,
      ),
      proposals: createLoanProposalsModule(
        this.web3Manager.web3,
        ETH_NETWORK_CONFIG.contracts.loanProposalsModule,
      ),
    };
    this.web3Manager.txWeb3
      .pipe(
        map(txWeb3 => txWeb3 && createLoanModule(txWeb3, ETH_NETWORK_CONFIG.contracts.loanModule)),
      )
      .subscribe(this.txContracts.loan);
    this.web3Manager.txWeb3
      .pipe(
        map(
          txWeb3 =>
            txWeb3 && createLoanLimitsModule(txWeb3, ETH_NETWORK_CONFIG.contracts.loanLimitsModule),
        ),
      )
      .subscribe(this.txContracts.limits);
    this.web3Manager.txWeb3
      .pipe(
        map(
          txWeb3 =>
            txWeb3 &&
            createLoanProposalsModule(txWeb3, ETH_NETWORK_CONFIG.contracts.loanProposalsModule),
        ),
      )
      .subscribe(this.txContracts.proposals);
  }

  @memoize()
  public getConfig$(): Observable<{
    limits: {
      lDebtAmountMin: BN;
      debtInterestMin: BN;
      pledgePercentMin: BN;
      lMinPledgeMax: BN;
      debtLoadMax: BN;
    };
    debtRepayDeadlinePeriod: BN;
    collateralToDebtRatio: BN;
    collateralToDebtRatioMultiplier: BN;
    debtLoadMultiplier: BN;
    debtInterestMultiplier: BN;
  }> {
    return combineLatest([
      this.readonlyContracts.limits.methods.allLimits(
        undefined,
        this.readonlyContracts.limits.events.LimitChanged(),
      ),
      this.readonlyContracts.loan.methods.DEBT_REPAY_DEADLINE_PERIOD(),
      this.readonlyContracts.proposals.methods.COLLATERAL_TO_DEBT_RATIO(),
      this.readonlyContracts.proposals.methods.COLLATERAL_TO_DEBT_RATIO_MULTIPLIER(),
      this.readonlyContracts.loan.methods.DEBT_LOAD_MULTIPLIER(),
      this.readonlyContracts.limits.methods.PLEDGE_PERCENT_MULTIPLIER(),
    ]).pipe(
      map(
        ([
          [lDebtAmountMin, debtInterestMin, pledgePercentMin, lMinPledgeMax, debtLoadMax],
          debtRepayDeadlinePeriod,
          collateralToDebtRatio,
          collateralToDebtRatioMultiplier,
          debtLoadMultiplier,
          debtInterestMultiplier,
        ]) => ({
          limits: {
            lDebtAmountMin,
            debtInterestMin,
            pledgePercentMin,
            lMinPledgeMax,
            debtLoadMax,
          },
          debtRepayDeadlinePeriod,
          collateralToDebtRatio,
          collateralToDebtRatioMultiplier,
          debtLoadMultiplier,
          debtInterestMultiplier,
        }),
      ),
    );
  }

  @memoize()
  public getAprDecimals$(): Observable<number> {
    // on the contract, apr is measured in fractions of a unit, so we need to shift the decimals by 2
    const toPercentMultiplierDivider = 2;

    return this.readonlyContracts.loan.methods.INTEREST_MULTIPLIER().pipe(
      map(multiplier => {
        // the multiplier is 10^n
        const decimals = multiplier.toString().length - 1 - toPercentMultiplierDivider;
        return Math.max(0, decimals);
      }),
    );
  }

  @memoize()
  public getTotalLProposals$(): Observable<BN> {
    return this.readonlyContracts.proposals.methods.totalLProposals(undefined, [
      this.readonlyContracts.proposals.events.PledgeAdded(),
      this.readonlyContracts.proposals.events.PledgeWithdrawn(),
      this.readonlyContracts.proposals.events.DebtProposalExecuted(),
    ]);
  }

  @memoize(R.identity)
  public getUnpaidInterest$(borrower: string): Observable<LiquidityAmount> {
    const marginOfSeconds = 15 * 60;
    const recalcInterestIntervalInMs = 3 * 60 * 1000;

    return this.fundsModuleApi.toLiquidityAmount$(
      timer(0, recalcInterestIntervalInMs).pipe(
        switchMap(() =>
          this.readonlyContracts.loan.methods.getUnpaidInterest(
            {
              borrower,
            },
            [
              this.readonlyContracts.loan.events.Repay({ filter: { sender: borrower } }),
              this.readonlyContracts.loan.events.DebtDefaultExecuted({ filter: { borrower } }),
            ],
          ),
        ),
        map(([unpaidInterest, interestPerSecond]) =>
          unpaidInterest.add(interestPerSecond.muln(marginOfSeconds)),
        ),
      ),
    );
  }

  @memoize()
  public getTotalLDebts$(): Observable<BN> {
    return this.readonlyContracts.loan.methods.totalLDebts(undefined, [
      this.readonlyContracts.proposals.events.DebtProposalExecuted(),
      this.readonlyContracts.loan.events.Repay(),
      this.readonlyContracts.loan.events.DebtDefaultExecuted(),
    ]);
  }

  @memoize()
  private getMaxDebts$(): Observable<BN> {
    return combineLatest([
      this.getConfig$(),
      this.getTotalLDebts$(),
      this.fundsModuleApi.getFundsLBalance$(),
    ]).pipe(
      map(([{ limits: { debtLoadMax }, debtLoadMultiplier }, lDebts, lBalance]) =>
        debtLoadMax.mul(lBalance.add(lDebts)).div(debtLoadMultiplier),
      ),
    );
  }

  @autobind
  public async stakePtk(
    fromAddress: string,
    values: { sourceAmount: LiquidityAmount; borrower: string; proposalId: string },
  ): Promise<void> {
    const { sourceAmount, borrower, proposalId } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContracts.proposals);

    const pledgeMargin = decimalsToWei(sourceAmount.currency.decimals).divn(PLEDGE_MARGIN_DIVIDER);

    const pAmount = await first(
      this.fundsModuleApi.convertLiquidityToPtkExit$(sourceAmount.add(pledgeMargin)),
    );
    const pBalance = await first(this.erc20Api.getPtkBalance$(fromAddress));

    const promiEvent = txLoanModule.methods.addPledge(
      {
        borrower,
        lAmountMin: new BN(0),
        pAmount: min(pAmount.toBN(), pBalance),
        proposal: bnToBn(proposalId),
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.addPledge', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async unstakePtk(
    fromAddress: string,
    values: {
      sourceAmount: LiquidityAmount; // in Liquidity by currentFullStakeCost
      borrower: string;
      proposalId: string;
      lInitialLocked: string;
      pInitialLocked: string;
    },
  ): Promise<void> {
    const { sourceAmount, borrower, proposalId, pInitialLocked, lInitialLocked } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContracts.proposals);

    const currentFullStakeCost = await first(
      this.fundsModuleApi.getAvailableBalanceIncreasing$(
        fromAddress,
        pInitialLocked,
        lInitialLocked,
      ),
    );

    const pAmount = new BN(pInitialLocked)
      .mul(sourceAmount.toBN())
      .div(currentFullStakeCost.toBN());

    const promiEvent = txLoanModule.methods.withdrawPledge(
      {
        borrower,
        pAmount,
        proposal: bnToBn(proposalId),
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.unstakePledge', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async unlockPtkFromPledge(
    fromAddress: string,
    values: {
      borrower: string;
      debtId: string;
    },
  ): Promise<void> {
    const { borrower, debtId } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContracts.loan);

    const promiEvent = txLoanModule.methods.withdrawUnlockedPledge(
      {
        borrower,
        debt: bnToBn(debtId),
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.withdrawUnlockedPledge', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async createLoanProposal(
    fromAddress: string,
    values: { sourceAmount: TokenAmount; apr: string; description: string },
  ): Promise<void> {
    const { sourceAmount, apr, description } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContracts.proposals);

    const hash = await this.swarmApi.upload<string>(description);

    const minLCollateral = await first(this.getMinLoanCollateral$(sourceAmount));
    const pAmount = await first(this.fundsModuleApi.convertLiquidityToPtkExit$(minLCollateral));
    const pBalance = await first(this.erc20Api.getPtkBalance$(fromAddress));

    const promiEvent = txLoanModule.methods.createDebtProposal(
      {
        pAmountMax: min(pAmount.toBN(), pBalance),
        debtLAmount: sourceAmount.toBN(),
        interest: new BN(apr),
        descriptionHash: hash,
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.createProposal', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async executeDebtProposal(
    fromAddress: string,
    proposalId: string,
    loanAmount: string,
  ): Promise<void> {
    const currentLDebts = await first(this.getTotalLDebts$());
    const maxLDebts = await first(this.getMaxDebts$());

    if (currentLDebts.add(new BN(loanAmount)).gt(maxLDebts)) {
      throw new Error('Proposal can not be executed now because of debt loan limit');
    }

    const txLoanModule = getCurrentValueOrThrow(this.txContracts.proposals);

    const promiEvent = txLoanModule.methods.executeDebtProposal(
      { proposal: bnToBn(proposalId) },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.executeProposal', promiEvent, {
      address: fromAddress,
      proposalId,
    });

    await promiEvent;
  }

  @autobind
  public async cancelDebtProposal(fromAddress: string, proposalId: string): Promise<void> {
    const txLoanModule = getCurrentValueOrThrow(this.txContracts.proposals);

    const promiEvent = txLoanModule.methods.cancelDebtProposal(
      { proposal: bnToBn(proposalId) },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.cancelProposal', promiEvent, {
      address: fromAddress,
      proposalId,
    });

    await promiEvent;
  }

  @autobind
  public async liquidateDebt(fromAddress: string, borrower: string, debtId: string): Promise<void> {
    const txLoanModule = getCurrentValueOrThrow(this.txContracts.loan);

    const promiEvent = txLoanModule.methods.executeDebtDefault(
      {
        borrower,
        debt: bnToBn(debtId),
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.liquidateDebt', promiEvent, {
      address: fromAddress,
      borrower,
      debtId,
    });

    await promiEvent;
  }

  @autobind
  public async repay(
    fromAddress: string,
    debtId: string,
    tokenAmountAfterFee: TokenAmount,
    method: RepaymentMethod,
  ): Promise<void> {
    const txLoanModule = getCurrentValueOrThrow(this.txContracts.loan);

    let promiEvent: PromiEvent<any>;

    if (method === 'fromAvailablePoolBalance') {
      const { percentDivider, withdrawFeePercent } = await first(this.curveModuleApi.getConfig$());
      const lAmountAfterFee = await first(
        this.fundsModuleApi.toLiquidityAmount$(of(tokenAmountAfterFee)),
      );

      const totalWithdrawAmount = calcWithdrawAmountBeforeFee({
        percentDivider,
        withdrawAmountAfterFee: lAmountAfterFee,
        withdrawFeePercent,
      });

      const pAmount = await first(
        this.fundsModuleApi.convertLiquidityToPtkExit$(totalWithdrawAmount),
      );
      const pBalance = await first(this.erc20Api.getPtkBalance$(fromAddress));

      promiEvent = txLoanModule.methods.repayPTK(
        {
          debt: bnToBn(debtId),
          lAmountMin: tokenAmountAfterFee.toBN(),
          pAmount: min(pAmount.toBN(), pBalance),
        },
        { from: fromAddress },
      );
    } else {
      await this.erc20Api.approve(
        fromAddress,
        ETH_NETWORK_CONFIG.contracts.fundsModule,
        tokenAmountAfterFee,
      );

      promiEvent = txLoanModule.methods.repay(
        { debt: bnToBn(debtId), lAmount: tokenAmountAfterFee.toBN() },
        { from: fromAddress },
      );
    }

    this.transactionsApi.pushToSubmittedTransactions$('loan.repay', promiEvent, {
      address: fromAddress,
      debtId,
      amount: tokenAmountAfterFee.toBN(),
    });

    await promiEvent;
  }

  @memoize(R.identity)
  public getMaxAvailableLoanSizeInDai$(address: string): Observable<BN> {
    return this.erc20Api.getPtkBalance$(address).pipe(
      switchMap(balance => {
        return this.fundsModuleApi.getPtkToDaiExitInfo$(balance.toString());
      }),
      map(item => item.total.muln(100).divn(MIN_COLLATERAL_PERCENT_FOR_BORROWER)),
    );
  }

  @memoize((...args: string[]) => args.join())
  public getDebtRequiredPayments$(
    borrower: string,
    debtId: string,
    lastPayment: string,
  ): Observable<{ loanSize: BN; currentInterest: BN }> {
    const marginOfSeconds = 15 * 60;
    const recalcInterestIntervalInMs = 10 * 60 * 1000;

    return timer(0, recalcInterestIntervalInMs).pipe(
      switchMap(() =>
        this.readonlyContracts.loan.methods.getDebtRequiredPayments(
          {
            borrower,
            debt: bnToBn(debtId),
          },
          [
            this.readonlyContracts.loan.events.Repay({ filter: { sender: borrower } }),
            this.readonlyContracts.loan.events.DebtDefaultExecuted({ filter: { borrower } }),
          ],
        ),
      ),
      map(([loanSize, currentInterest]) => {
        const secondsAfterPayment = new BN(Date.now() / 1000 - parseInt(lastPayment, 10));

        return {
          loanSize,
          currentInterest: currentInterest
            .mul(secondsAfterPayment.addn(marginOfSeconds))
            .div(secondsAfterPayment),
        };
      }),
    );
  }

  @memoize((...args: string[]) => args.join())
  public getPledgeRequirements$(
    borrower: string,
    proposalId: string,
  ): Observable<{
    minLPledge: LiquidityAmount;
    maxLPledge: LiquidityAmount;
    minPPledge: TokenAmount;
    maxPPledge: TokenAmount;
  }> {
    return this.fundsModuleApi
      .toLiquidityAmount$(
        this.readonlyContracts.proposals.methods.getPledgeRequirements(
          {
            borrower,
            proposal: bnToBn(proposalId),
          },
          [
            this.readonlyContracts.proposals.events.PledgeAdded(),
            this.readonlyContracts.proposals.events.PledgeWithdrawn(),
          ],
          1000,
        ),
      )
      .pipe(
        switchMap(([minLPledge, maxLPledge]) => {
          return combineLatest([
            of([minLPledge, maxLPledge]),
            this.fundsModuleApi.convertLiquidityToPtkExit$(minLPledge),
            this.fundsModuleApi.convertLiquidityToPtkExit$(maxLPledge),
          ]);
        }),
        map(([[minLPledge, maxLPledge], minPPledge, maxPPledge]) => ({
          minLPledge,
          maxLPledge,
          minPPledge,
          maxPPledge,
        })),
      );
  }

  @memoize((loanSize: TokenAmount) => loanSize.toString())
  // TODO take MIN_COLLATERAL_PERCENT_FOR_BORROWER from contract
  public getMinLoanCollateral$(loanSize: TokenAmount): Observable<LiquidityAmount> {
    return this.fundsModuleApi.toLiquidityAmount$(
      of(loanSize.mul(MIN_COLLATERAL_PERCENT_FOR_BORROWER).div(100)),
    );
  }

  @memoize(R.identity)
  // eslint-disable-next-line class-methods-use-this
  public calculateFullLoanStake$(loanSize: string): Observable<BN> {
    return this.getConfig$().pipe(
      map(({ collateralToDebtRatio, collateralToDebtRatioMultiplier }) =>
        new BN(loanSize)
          .mul(new BN(collateralToDebtRatio))
          .div(new BN(collateralToDebtRatioMultiplier)),
      ),
    );
  }

  @memoize((...args: string[]) => args.join())
  // eslint-disable-next-line class-methods-use-this
  public calculatePAvailableForUnlock$(
    borrower: string,
    supporter: string,
    debtId: string,
  ): Observable<BN> {
    return this.calculatePledgeInfo$(borrower, supporter, debtId).pipe(
      map(({ pUnlocked, pInterest, pWithdrawn }) =>
        max('0', pUnlocked.add(pInterest).sub(pWithdrawn)),
      ),
    );
  }

  @memoize((...args: string[]) => args.join())
  // eslint-disable-next-line class-methods-use-this
  private calculatePledgeInfo$(
    borrower: string,
    supporter: string,
    debtId: string,
  ): Observable<{
    pLocked: BN;
    pUnlocked: BN;
    pInterest: BN;
    pWithdrawn: BN;
  }> {
    return this.readonlyContracts.loan.methods
      .calculatePledgeInfo(
        {
          borrower,
          debt: bnToBn(debtId),
          supporter,
        },
        [
          this.readonlyContracts.loan.events.Repay({ filter: { sender: borrower } }),
          this.readonlyContracts.loan.events.DebtDefaultExecuted({ filter: { borrower } }),
          this.readonlyContracts.loan.events.UnlockedPledgeWithdraw({
            filter: { sender: supporter },
          }),
        ],
      )
      .pipe(
        map(([pLocked, pUnlocked, pInterest, pWithdrawn]) => ({
          pLocked,
          pUnlocked,
          pInterest,
          pWithdrawn,
        })),
      );
  }
}
