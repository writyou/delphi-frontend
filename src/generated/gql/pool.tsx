import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Bytes: string;
  BigInt: string;
  BigDecimal: string;
};

export type BalanceChange = {
  __typename?: 'BalanceChange';
  id: Scalars['ID'];
  date: Scalars['BigInt'];
  user: User;
  amount: Scalars['BigInt'];
  type: BalanceChangeType;
};

export type BalanceChange_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  type?: Maybe<BalanceChangeType>;
  type_not?: Maybe<BalanceChangeType>;
};

export enum BalanceChange_OrderBy {
  Id = 'id',
  Date = 'date',
  User = 'user',
  Amount = 'amount',
  Type = 'type'
}

export enum BalanceChangeType {
  Deposit = 'DEPOSIT',
  Withdraw = 'WITHDRAW'
}



export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};


export type CommonHandlerCash = {
  __typename?: 'CommonHandlerCash';
  id: Scalars['ID'];
  lastPoolSnapshot: Scalars['ID'];
  nextDistributionEventIndex: Scalars['BigInt'];
  proposalInterests: Array<Scalars['BigInt']>;
  proposalInterestCounts: Array<Scalars['Int']>;
};

export type CommonHandlerCash_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lastPoolSnapshot?: Maybe<Scalars['ID']>;
  lastPoolSnapshot_not?: Maybe<Scalars['ID']>;
  lastPoolSnapshot_gt?: Maybe<Scalars['ID']>;
  lastPoolSnapshot_lt?: Maybe<Scalars['ID']>;
  lastPoolSnapshot_gte?: Maybe<Scalars['ID']>;
  lastPoolSnapshot_lte?: Maybe<Scalars['ID']>;
  lastPoolSnapshot_in?: Maybe<Array<Scalars['ID']>>;
  lastPoolSnapshot_not_in?: Maybe<Array<Scalars['ID']>>;
  nextDistributionEventIndex?: Maybe<Scalars['BigInt']>;
  nextDistributionEventIndex_not?: Maybe<Scalars['BigInt']>;
  nextDistributionEventIndex_gt?: Maybe<Scalars['BigInt']>;
  nextDistributionEventIndex_lt?: Maybe<Scalars['BigInt']>;
  nextDistributionEventIndex_gte?: Maybe<Scalars['BigInt']>;
  nextDistributionEventIndex_lte?: Maybe<Scalars['BigInt']>;
  nextDistributionEventIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  nextDistributionEventIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  proposalInterests?: Maybe<Array<Scalars['BigInt']>>;
  proposalInterests_not?: Maybe<Array<Scalars['BigInt']>>;
  proposalInterests_contains?: Maybe<Array<Scalars['BigInt']>>;
  proposalInterests_not_contains?: Maybe<Array<Scalars['BigInt']>>;
  proposalInterestCounts?: Maybe<Array<Scalars['Int']>>;
  proposalInterestCounts_not?: Maybe<Array<Scalars['Int']>>;
  proposalInterestCounts_contains?: Maybe<Array<Scalars['Int']>>;
  proposalInterestCounts_not_contains?: Maybe<Array<Scalars['Int']>>;
};

export enum CommonHandlerCash_OrderBy {
  Id = 'id',
  LastPoolSnapshot = 'lastPoolSnapshot',
  NextDistributionEventIndex = 'nextDistributionEventIndex',
  ProposalInterests = 'proposalInterests',
  ProposalInterestCounts = 'proposalInterestCounts'
}

export type Debt = {
  __typename?: 'Debt';
  /** keccak256(borrowerAddress + proposalId) */
  id: Scalars['ID'];
  debt_id?: Maybe<Scalars['BigInt']>;
  proposal_id: Scalars['String'];
  description: Scalars['Bytes'];
  apr: Scalars['BigInt'];
  borrower: User;
  supporters: Array<User>;
  pledges: Array<Pledge>;
  total: Scalars['BigInt'];
  repayed: Scalars['BigInt'];
  lStaked: Scalars['BigInt'];
  pStaked: Scalars['BigInt'];
  status: Status;
  stakeProgress: Scalars['String'];
  start_date?: Maybe<Scalars['BigInt']>;
  last_update?: Maybe<Scalars['BigInt']>;
};


export type DebtSupportersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<User_Filter>;
};


export type DebtPledgesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pledge_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Pledge_Filter>;
};

export type Debt_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  debt_id?: Maybe<Scalars['BigInt']>;
  debt_id_not?: Maybe<Scalars['BigInt']>;
  debt_id_gt?: Maybe<Scalars['BigInt']>;
  debt_id_lt?: Maybe<Scalars['BigInt']>;
  debt_id_gte?: Maybe<Scalars['BigInt']>;
  debt_id_lte?: Maybe<Scalars['BigInt']>;
  debt_id_in?: Maybe<Array<Scalars['BigInt']>>;
  debt_id_not_in?: Maybe<Array<Scalars['BigInt']>>;
  proposal_id?: Maybe<Scalars['String']>;
  proposal_id_not?: Maybe<Scalars['String']>;
  proposal_id_gt?: Maybe<Scalars['String']>;
  proposal_id_lt?: Maybe<Scalars['String']>;
  proposal_id_gte?: Maybe<Scalars['String']>;
  proposal_id_lte?: Maybe<Scalars['String']>;
  proposal_id_in?: Maybe<Array<Scalars['String']>>;
  proposal_id_not_in?: Maybe<Array<Scalars['String']>>;
  proposal_id_contains?: Maybe<Scalars['String']>;
  proposal_id_not_contains?: Maybe<Scalars['String']>;
  proposal_id_starts_with?: Maybe<Scalars['String']>;
  proposal_id_not_starts_with?: Maybe<Scalars['String']>;
  proposal_id_ends_with?: Maybe<Scalars['String']>;
  proposal_id_not_ends_with?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['Bytes']>;
  description_not?: Maybe<Scalars['Bytes']>;
  description_in?: Maybe<Array<Scalars['Bytes']>>;
  description_not_in?: Maybe<Array<Scalars['Bytes']>>;
  description_contains?: Maybe<Scalars['Bytes']>;
  description_not_contains?: Maybe<Scalars['Bytes']>;
  apr?: Maybe<Scalars['BigInt']>;
  apr_not?: Maybe<Scalars['BigInt']>;
  apr_gt?: Maybe<Scalars['BigInt']>;
  apr_lt?: Maybe<Scalars['BigInt']>;
  apr_gte?: Maybe<Scalars['BigInt']>;
  apr_lte?: Maybe<Scalars['BigInt']>;
  apr_in?: Maybe<Array<Scalars['BigInt']>>;
  apr_not_in?: Maybe<Array<Scalars['BigInt']>>;
  borrower?: Maybe<Scalars['String']>;
  borrower_not?: Maybe<Scalars['String']>;
  borrower_gt?: Maybe<Scalars['String']>;
  borrower_lt?: Maybe<Scalars['String']>;
  borrower_gte?: Maybe<Scalars['String']>;
  borrower_lte?: Maybe<Scalars['String']>;
  borrower_in?: Maybe<Array<Scalars['String']>>;
  borrower_not_in?: Maybe<Array<Scalars['String']>>;
  borrower_contains?: Maybe<Scalars['String']>;
  borrower_not_contains?: Maybe<Scalars['String']>;
  borrower_starts_with?: Maybe<Scalars['String']>;
  borrower_not_starts_with?: Maybe<Scalars['String']>;
  borrower_ends_with?: Maybe<Scalars['String']>;
  borrower_not_ends_with?: Maybe<Scalars['String']>;
  supporters?: Maybe<Array<Scalars['String']>>;
  supporters_not?: Maybe<Array<Scalars['String']>>;
  supporters_contains?: Maybe<Array<Scalars['String']>>;
  supporters_not_contains?: Maybe<Array<Scalars['String']>>;
  pledges?: Maybe<Array<Scalars['String']>>;
  pledges_not?: Maybe<Array<Scalars['String']>>;
  pledges_contains?: Maybe<Array<Scalars['String']>>;
  pledges_not_contains?: Maybe<Array<Scalars['String']>>;
  total?: Maybe<Scalars['BigInt']>;
  total_not?: Maybe<Scalars['BigInt']>;
  total_gt?: Maybe<Scalars['BigInt']>;
  total_lt?: Maybe<Scalars['BigInt']>;
  total_gte?: Maybe<Scalars['BigInt']>;
  total_lte?: Maybe<Scalars['BigInt']>;
  total_in?: Maybe<Array<Scalars['BigInt']>>;
  total_not_in?: Maybe<Array<Scalars['BigInt']>>;
  repayed?: Maybe<Scalars['BigInt']>;
  repayed_not?: Maybe<Scalars['BigInt']>;
  repayed_gt?: Maybe<Scalars['BigInt']>;
  repayed_lt?: Maybe<Scalars['BigInt']>;
  repayed_gte?: Maybe<Scalars['BigInt']>;
  repayed_lte?: Maybe<Scalars['BigInt']>;
  repayed_in?: Maybe<Array<Scalars['BigInt']>>;
  repayed_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lStaked?: Maybe<Scalars['BigInt']>;
  lStaked_not?: Maybe<Scalars['BigInt']>;
  lStaked_gt?: Maybe<Scalars['BigInt']>;
  lStaked_lt?: Maybe<Scalars['BigInt']>;
  lStaked_gte?: Maybe<Scalars['BigInt']>;
  lStaked_lte?: Maybe<Scalars['BigInt']>;
  lStaked_in?: Maybe<Array<Scalars['BigInt']>>;
  lStaked_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pStaked?: Maybe<Scalars['BigInt']>;
  pStaked_not?: Maybe<Scalars['BigInt']>;
  pStaked_gt?: Maybe<Scalars['BigInt']>;
  pStaked_lt?: Maybe<Scalars['BigInt']>;
  pStaked_gte?: Maybe<Scalars['BigInt']>;
  pStaked_lte?: Maybe<Scalars['BigInt']>;
  pStaked_in?: Maybe<Array<Scalars['BigInt']>>;
  pStaked_not_in?: Maybe<Array<Scalars['BigInt']>>;
  status?: Maybe<Status>;
  status_not?: Maybe<Status>;
  stakeProgress?: Maybe<Scalars['String']>;
  stakeProgress_not?: Maybe<Scalars['String']>;
  stakeProgress_gt?: Maybe<Scalars['String']>;
  stakeProgress_lt?: Maybe<Scalars['String']>;
  stakeProgress_gte?: Maybe<Scalars['String']>;
  stakeProgress_lte?: Maybe<Scalars['String']>;
  stakeProgress_in?: Maybe<Array<Scalars['String']>>;
  stakeProgress_not_in?: Maybe<Array<Scalars['String']>>;
  stakeProgress_contains?: Maybe<Scalars['String']>;
  stakeProgress_not_contains?: Maybe<Scalars['String']>;
  stakeProgress_starts_with?: Maybe<Scalars['String']>;
  stakeProgress_not_starts_with?: Maybe<Scalars['String']>;
  stakeProgress_ends_with?: Maybe<Scalars['String']>;
  stakeProgress_not_ends_with?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['BigInt']>;
  start_date_not?: Maybe<Scalars['BigInt']>;
  start_date_gt?: Maybe<Scalars['BigInt']>;
  start_date_lt?: Maybe<Scalars['BigInt']>;
  start_date_gte?: Maybe<Scalars['BigInt']>;
  start_date_lte?: Maybe<Scalars['BigInt']>;
  start_date_in?: Maybe<Array<Scalars['BigInt']>>;
  start_date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  last_update?: Maybe<Scalars['BigInt']>;
  last_update_not?: Maybe<Scalars['BigInt']>;
  last_update_gt?: Maybe<Scalars['BigInt']>;
  last_update_lt?: Maybe<Scalars['BigInt']>;
  last_update_gte?: Maybe<Scalars['BigInt']>;
  last_update_lte?: Maybe<Scalars['BigInt']>;
  last_update_in?: Maybe<Array<Scalars['BigInt']>>;
  last_update_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Debt_OrderBy {
  Id = 'id',
  DebtId = 'debt_id',
  ProposalId = 'proposal_id',
  Description = 'description',
  Apr = 'apr',
  Borrower = 'borrower',
  Supporters = 'supporters',
  Pledges = 'pledges',
  Total = 'total',
  Repayed = 'repayed',
  LStaked = 'lStaked',
  PStaked = 'pStaked',
  Status = 'status',
  StakeProgress = 'stakeProgress',
  StartDate = 'start_date',
  LastUpdate = 'last_update'
}

export type DefiApr = {
  __typename?: 'DefiAPR';
  id: Scalars['ID'];
  dateFrom: Scalars['BigInt'];
  dateTo: Scalars['BigInt'];
  amountFrom: Scalars['BigInt'];
  amountTo: Scalars['BigInt'];
  duration: Scalars['BigInt'];
  apr: Scalars['BigInt'];
  aprDecimals: Scalars['Int'];
};

export type DefiApr_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  dateFrom?: Maybe<Scalars['BigInt']>;
  dateFrom_not?: Maybe<Scalars['BigInt']>;
  dateFrom_gt?: Maybe<Scalars['BigInt']>;
  dateFrom_lt?: Maybe<Scalars['BigInt']>;
  dateFrom_gte?: Maybe<Scalars['BigInt']>;
  dateFrom_lte?: Maybe<Scalars['BigInt']>;
  dateFrom_in?: Maybe<Array<Scalars['BigInt']>>;
  dateFrom_not_in?: Maybe<Array<Scalars['BigInt']>>;
  dateTo?: Maybe<Scalars['BigInt']>;
  dateTo_not?: Maybe<Scalars['BigInt']>;
  dateTo_gt?: Maybe<Scalars['BigInt']>;
  dateTo_lt?: Maybe<Scalars['BigInt']>;
  dateTo_gte?: Maybe<Scalars['BigInt']>;
  dateTo_lte?: Maybe<Scalars['BigInt']>;
  dateTo_in?: Maybe<Array<Scalars['BigInt']>>;
  dateTo_not_in?: Maybe<Array<Scalars['BigInt']>>;
  amountFrom?: Maybe<Scalars['BigInt']>;
  amountFrom_not?: Maybe<Scalars['BigInt']>;
  amountFrom_gt?: Maybe<Scalars['BigInt']>;
  amountFrom_lt?: Maybe<Scalars['BigInt']>;
  amountFrom_gte?: Maybe<Scalars['BigInt']>;
  amountFrom_lte?: Maybe<Scalars['BigInt']>;
  amountFrom_in?: Maybe<Array<Scalars['BigInt']>>;
  amountFrom_not_in?: Maybe<Array<Scalars['BigInt']>>;
  amountTo?: Maybe<Scalars['BigInt']>;
  amountTo_not?: Maybe<Scalars['BigInt']>;
  amountTo_gt?: Maybe<Scalars['BigInt']>;
  amountTo_lt?: Maybe<Scalars['BigInt']>;
  amountTo_gte?: Maybe<Scalars['BigInt']>;
  amountTo_lte?: Maybe<Scalars['BigInt']>;
  amountTo_in?: Maybe<Array<Scalars['BigInt']>>;
  amountTo_not_in?: Maybe<Array<Scalars['BigInt']>>;
  duration?: Maybe<Scalars['BigInt']>;
  duration_not?: Maybe<Scalars['BigInt']>;
  duration_gt?: Maybe<Scalars['BigInt']>;
  duration_lt?: Maybe<Scalars['BigInt']>;
  duration_gte?: Maybe<Scalars['BigInt']>;
  duration_lte?: Maybe<Scalars['BigInt']>;
  duration_in?: Maybe<Array<Scalars['BigInt']>>;
  duration_not_in?: Maybe<Array<Scalars['BigInt']>>;
  apr?: Maybe<Scalars['BigInt']>;
  apr_not?: Maybe<Scalars['BigInt']>;
  apr_gt?: Maybe<Scalars['BigInt']>;
  apr_lt?: Maybe<Scalars['BigInt']>;
  apr_gte?: Maybe<Scalars['BigInt']>;
  apr_lte?: Maybe<Scalars['BigInt']>;
  apr_in?: Maybe<Array<Scalars['BigInt']>>;
  apr_not_in?: Maybe<Array<Scalars['BigInt']>>;
  aprDecimals?: Maybe<Scalars['Int']>;
  aprDecimals_not?: Maybe<Scalars['Int']>;
  aprDecimals_gt?: Maybe<Scalars['Int']>;
  aprDecimals_lt?: Maybe<Scalars['Int']>;
  aprDecimals_gte?: Maybe<Scalars['Int']>;
  aprDecimals_lte?: Maybe<Scalars['Int']>;
  aprDecimals_in?: Maybe<Array<Scalars['Int']>>;
  aprDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum DefiApr_OrderBy {
  Id = 'id',
  DateFrom = 'dateFrom',
  DateTo = 'dateTo',
  AmountFrom = 'amountFrom',
  AmountTo = 'amountTo',
  Duration = 'duration',
  Apr = 'apr',
  AprDecimals = 'aprDecimals'
}

export type DefiHandlerCash = {
  __typename?: 'DefiHandlerCash';
  id: Scalars['ID'];
  lastDefiAPR?: Maybe<Scalars['ID']>;
};

export type DefiHandlerCash_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lastDefiAPR?: Maybe<Scalars['ID']>;
  lastDefiAPR_not?: Maybe<Scalars['ID']>;
  lastDefiAPR_gt?: Maybe<Scalars['ID']>;
  lastDefiAPR_lt?: Maybe<Scalars['ID']>;
  lastDefiAPR_gte?: Maybe<Scalars['ID']>;
  lastDefiAPR_lte?: Maybe<Scalars['ID']>;
  lastDefiAPR_in?: Maybe<Array<Scalars['ID']>>;
  lastDefiAPR_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum DefiHandlerCash_OrderBy {
  Id = 'id',
  LastDefiApr = 'lastDefiAPR'
}

export type DistributionEvent = {
  __typename?: 'DistributionEvent';
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  claimed: Scalars['BigInt'];
  totalSupply: Scalars['BigInt'];
  date: Scalars['BigInt'];
  poolState: Pool;
  claims: Array<Earning>;
};


export type DistributionEventClaimsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Earning_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Earning_Filter>;
};

export type DistributionEvent_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  claimed?: Maybe<Scalars['BigInt']>;
  claimed_not?: Maybe<Scalars['BigInt']>;
  claimed_gt?: Maybe<Scalars['BigInt']>;
  claimed_lt?: Maybe<Scalars['BigInt']>;
  claimed_gte?: Maybe<Scalars['BigInt']>;
  claimed_lte?: Maybe<Scalars['BigInt']>;
  claimed_in?: Maybe<Array<Scalars['BigInt']>>;
  claimed_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalSupply?: Maybe<Scalars['BigInt']>;
  totalSupply_not?: Maybe<Scalars['BigInt']>;
  totalSupply_gt?: Maybe<Scalars['BigInt']>;
  totalSupply_lt?: Maybe<Scalars['BigInt']>;
  totalSupply_gte?: Maybe<Scalars['BigInt']>;
  totalSupply_lte?: Maybe<Scalars['BigInt']>;
  totalSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  poolState?: Maybe<Scalars['String']>;
  poolState_not?: Maybe<Scalars['String']>;
  poolState_gt?: Maybe<Scalars['String']>;
  poolState_lt?: Maybe<Scalars['String']>;
  poolState_gte?: Maybe<Scalars['String']>;
  poolState_lte?: Maybe<Scalars['String']>;
  poolState_in?: Maybe<Array<Scalars['String']>>;
  poolState_not_in?: Maybe<Array<Scalars['String']>>;
  poolState_contains?: Maybe<Scalars['String']>;
  poolState_not_contains?: Maybe<Scalars['String']>;
  poolState_starts_with?: Maybe<Scalars['String']>;
  poolState_not_starts_with?: Maybe<Scalars['String']>;
  poolState_ends_with?: Maybe<Scalars['String']>;
  poolState_not_ends_with?: Maybe<Scalars['String']>;
};

export enum DistributionEvent_OrderBy {
  Id = 'id',
  Amount = 'amount',
  Claimed = 'claimed',
  TotalSupply = 'totalSupply',
  Date = 'date',
  PoolState = 'poolState',
  Claims = 'claims'
}

export enum DistributionType {
  DebtInterest = 'DEBT_INTEREST',
  PoolDistributions = 'POOL_DISTRIBUTIONS'
}

export type Earning = {
  __typename?: 'Earning';
  id: Scalars['ID'];
  date: Scalars['BigInt'];
  user: User;
  pAmount: Scalars['BigInt'];
  lAmount: Scalars['BigInt'];
  type: DistributionType;
  distributionEvent?: Maybe<DistributionEvent>;
};

export type Earning_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  pAmount?: Maybe<Scalars['BigInt']>;
  pAmount_not?: Maybe<Scalars['BigInt']>;
  pAmount_gt?: Maybe<Scalars['BigInt']>;
  pAmount_lt?: Maybe<Scalars['BigInt']>;
  pAmount_gte?: Maybe<Scalars['BigInt']>;
  pAmount_lte?: Maybe<Scalars['BigInt']>;
  pAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  pAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lAmount?: Maybe<Scalars['BigInt']>;
  lAmount_not?: Maybe<Scalars['BigInt']>;
  lAmount_gt?: Maybe<Scalars['BigInt']>;
  lAmount_lt?: Maybe<Scalars['BigInt']>;
  lAmount_gte?: Maybe<Scalars['BigInt']>;
  lAmount_lte?: Maybe<Scalars['BigInt']>;
  lAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  lAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  type?: Maybe<DistributionType>;
  type_not?: Maybe<DistributionType>;
  distributionEvent?: Maybe<Scalars['String']>;
  distributionEvent_not?: Maybe<Scalars['String']>;
  distributionEvent_gt?: Maybe<Scalars['String']>;
  distributionEvent_lt?: Maybe<Scalars['String']>;
  distributionEvent_gte?: Maybe<Scalars['String']>;
  distributionEvent_lte?: Maybe<Scalars['String']>;
  distributionEvent_in?: Maybe<Array<Scalars['String']>>;
  distributionEvent_not_in?: Maybe<Array<Scalars['String']>>;
  distributionEvent_contains?: Maybe<Scalars['String']>;
  distributionEvent_not_contains?: Maybe<Scalars['String']>;
  distributionEvent_starts_with?: Maybe<Scalars['String']>;
  distributionEvent_not_starts_with?: Maybe<Scalars['String']>;
  distributionEvent_ends_with?: Maybe<Scalars['String']>;
  distributionEvent_not_ends_with?: Maybe<Scalars['String']>;
};

export enum Earning_OrderBy {
  Id = 'id',
  Date = 'date',
  User = 'user',
  PAmount = 'pAmount',
  LAmount = 'lAmount',
  Type = 'type',
  DistributionEvent = 'distributionEvent'
}

export type ExitBalance = {
  __typename?: 'ExitBalance';
  id: Scalars['ID'];
  date: Scalars['BigInt'];
  user: User;
  lBalance: Scalars['BigInt'];
  pBalance: Scalars['BigInt'];
};

export type ExitBalance_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  lBalance?: Maybe<Scalars['BigInt']>;
  lBalance_not?: Maybe<Scalars['BigInt']>;
  lBalance_gt?: Maybe<Scalars['BigInt']>;
  lBalance_lt?: Maybe<Scalars['BigInt']>;
  lBalance_gte?: Maybe<Scalars['BigInt']>;
  lBalance_lte?: Maybe<Scalars['BigInt']>;
  lBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  lBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pBalance?: Maybe<Scalars['BigInt']>;
  pBalance_not?: Maybe<Scalars['BigInt']>;
  pBalance_gt?: Maybe<Scalars['BigInt']>;
  pBalance_lt?: Maybe<Scalars['BigInt']>;
  pBalance_gte?: Maybe<Scalars['BigInt']>;
  pBalance_lte?: Maybe<Scalars['BigInt']>;
  pBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  pBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ExitBalance_OrderBy {
  Id = 'id',
  Date = 'date',
  User = 'user',
  LBalance = 'lBalance',
  PBalance = 'pBalance'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Pledge = {
  __typename?: 'Pledge';
  /** keccak256(supporterAddress + borrowerAddress + proposalId) */
  id: Scalars['ID'];
  pledger: User;
  debt: Debt;
  lInitialLocked: Scalars['BigInt'];
  pInitialLocked: Scalars['BigInt'];
  pLocked: Scalars['BigInt'];
  unlockLiquidity: Scalars['BigInt'];
  pInterest: Scalars['BigInt'];
};

export type Pledge_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pledger?: Maybe<Scalars['String']>;
  pledger_not?: Maybe<Scalars['String']>;
  pledger_gt?: Maybe<Scalars['String']>;
  pledger_lt?: Maybe<Scalars['String']>;
  pledger_gte?: Maybe<Scalars['String']>;
  pledger_lte?: Maybe<Scalars['String']>;
  pledger_in?: Maybe<Array<Scalars['String']>>;
  pledger_not_in?: Maybe<Array<Scalars['String']>>;
  pledger_contains?: Maybe<Scalars['String']>;
  pledger_not_contains?: Maybe<Scalars['String']>;
  pledger_starts_with?: Maybe<Scalars['String']>;
  pledger_not_starts_with?: Maybe<Scalars['String']>;
  pledger_ends_with?: Maybe<Scalars['String']>;
  pledger_not_ends_with?: Maybe<Scalars['String']>;
  debt?: Maybe<Scalars['String']>;
  debt_not?: Maybe<Scalars['String']>;
  debt_gt?: Maybe<Scalars['String']>;
  debt_lt?: Maybe<Scalars['String']>;
  debt_gte?: Maybe<Scalars['String']>;
  debt_lte?: Maybe<Scalars['String']>;
  debt_in?: Maybe<Array<Scalars['String']>>;
  debt_not_in?: Maybe<Array<Scalars['String']>>;
  debt_contains?: Maybe<Scalars['String']>;
  debt_not_contains?: Maybe<Scalars['String']>;
  debt_starts_with?: Maybe<Scalars['String']>;
  debt_not_starts_with?: Maybe<Scalars['String']>;
  debt_ends_with?: Maybe<Scalars['String']>;
  debt_not_ends_with?: Maybe<Scalars['String']>;
  lInitialLocked?: Maybe<Scalars['BigInt']>;
  lInitialLocked_not?: Maybe<Scalars['BigInt']>;
  lInitialLocked_gt?: Maybe<Scalars['BigInt']>;
  lInitialLocked_lt?: Maybe<Scalars['BigInt']>;
  lInitialLocked_gte?: Maybe<Scalars['BigInt']>;
  lInitialLocked_lte?: Maybe<Scalars['BigInt']>;
  lInitialLocked_in?: Maybe<Array<Scalars['BigInt']>>;
  lInitialLocked_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pInitialLocked?: Maybe<Scalars['BigInt']>;
  pInitialLocked_not?: Maybe<Scalars['BigInt']>;
  pInitialLocked_gt?: Maybe<Scalars['BigInt']>;
  pInitialLocked_lt?: Maybe<Scalars['BigInt']>;
  pInitialLocked_gte?: Maybe<Scalars['BigInt']>;
  pInitialLocked_lte?: Maybe<Scalars['BigInt']>;
  pInitialLocked_in?: Maybe<Array<Scalars['BigInt']>>;
  pInitialLocked_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pLocked?: Maybe<Scalars['BigInt']>;
  pLocked_not?: Maybe<Scalars['BigInt']>;
  pLocked_gt?: Maybe<Scalars['BigInt']>;
  pLocked_lt?: Maybe<Scalars['BigInt']>;
  pLocked_gte?: Maybe<Scalars['BigInt']>;
  pLocked_lte?: Maybe<Scalars['BigInt']>;
  pLocked_in?: Maybe<Array<Scalars['BigInt']>>;
  pLocked_not_in?: Maybe<Array<Scalars['BigInt']>>;
  unlockLiquidity?: Maybe<Scalars['BigInt']>;
  unlockLiquidity_not?: Maybe<Scalars['BigInt']>;
  unlockLiquidity_gt?: Maybe<Scalars['BigInt']>;
  unlockLiquidity_lt?: Maybe<Scalars['BigInt']>;
  unlockLiquidity_gte?: Maybe<Scalars['BigInt']>;
  unlockLiquidity_lte?: Maybe<Scalars['BigInt']>;
  unlockLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  unlockLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pInterest?: Maybe<Scalars['BigInt']>;
  pInterest_not?: Maybe<Scalars['BigInt']>;
  pInterest_gt?: Maybe<Scalars['BigInt']>;
  pInterest_lt?: Maybe<Scalars['BigInt']>;
  pInterest_gte?: Maybe<Scalars['BigInt']>;
  pInterest_lte?: Maybe<Scalars['BigInt']>;
  pInterest_in?: Maybe<Array<Scalars['BigInt']>>;
  pInterest_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Pledge_OrderBy {
  Id = 'id',
  Pledger = 'pledger',
  Debt = 'debt',
  LInitialLocked = 'lInitialLocked',
  PInitialLocked = 'pInitialLocked',
  PLocked = 'pLocked',
  UnlockLiquidity = 'unlockLiquidity',
  PInterest = 'pInterest'
}

export type Pool = {
  __typename?: 'Pool';
  id: Scalars['ID'];
  lBalance: Scalars['BigInt'];
  lDebt: Scalars['BigInt'];
  lProposals: Scalars['BigInt'];
  pEnterPrice: Scalars['BigInt'];
  pExitPrice: Scalars['BigInt'];
  users: Array<Scalars['String']>;
  usersLength: Scalars['BigInt'];
  depositSum: Scalars['BigInt'];
  withdrawSum: Scalars['BigInt'];
  proposalsCount: Scalars['BigInt'];
  debtsCount: Scalars['BigInt'];
  maxProposalInterest: Scalars['BigInt'];
};

export type Pool_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lBalance?: Maybe<Scalars['BigInt']>;
  lBalance_not?: Maybe<Scalars['BigInt']>;
  lBalance_gt?: Maybe<Scalars['BigInt']>;
  lBalance_lt?: Maybe<Scalars['BigInt']>;
  lBalance_gte?: Maybe<Scalars['BigInt']>;
  lBalance_lte?: Maybe<Scalars['BigInt']>;
  lBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  lBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lDebt?: Maybe<Scalars['BigInt']>;
  lDebt_not?: Maybe<Scalars['BigInt']>;
  lDebt_gt?: Maybe<Scalars['BigInt']>;
  lDebt_lt?: Maybe<Scalars['BigInt']>;
  lDebt_gte?: Maybe<Scalars['BigInt']>;
  lDebt_lte?: Maybe<Scalars['BigInt']>;
  lDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lProposals?: Maybe<Scalars['BigInt']>;
  lProposals_not?: Maybe<Scalars['BigInt']>;
  lProposals_gt?: Maybe<Scalars['BigInt']>;
  lProposals_lt?: Maybe<Scalars['BigInt']>;
  lProposals_gte?: Maybe<Scalars['BigInt']>;
  lProposals_lte?: Maybe<Scalars['BigInt']>;
  lProposals_in?: Maybe<Array<Scalars['BigInt']>>;
  lProposals_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pEnterPrice?: Maybe<Scalars['BigInt']>;
  pEnterPrice_not?: Maybe<Scalars['BigInt']>;
  pEnterPrice_gt?: Maybe<Scalars['BigInt']>;
  pEnterPrice_lt?: Maybe<Scalars['BigInt']>;
  pEnterPrice_gte?: Maybe<Scalars['BigInt']>;
  pEnterPrice_lte?: Maybe<Scalars['BigInt']>;
  pEnterPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  pEnterPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pExitPrice?: Maybe<Scalars['BigInt']>;
  pExitPrice_not?: Maybe<Scalars['BigInt']>;
  pExitPrice_gt?: Maybe<Scalars['BigInt']>;
  pExitPrice_lt?: Maybe<Scalars['BigInt']>;
  pExitPrice_gte?: Maybe<Scalars['BigInt']>;
  pExitPrice_lte?: Maybe<Scalars['BigInt']>;
  pExitPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  pExitPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  users?: Maybe<Array<Scalars['String']>>;
  users_not?: Maybe<Array<Scalars['String']>>;
  users_contains?: Maybe<Array<Scalars['String']>>;
  users_not_contains?: Maybe<Array<Scalars['String']>>;
  usersLength?: Maybe<Scalars['BigInt']>;
  usersLength_not?: Maybe<Scalars['BigInt']>;
  usersLength_gt?: Maybe<Scalars['BigInt']>;
  usersLength_lt?: Maybe<Scalars['BigInt']>;
  usersLength_gte?: Maybe<Scalars['BigInt']>;
  usersLength_lte?: Maybe<Scalars['BigInt']>;
  usersLength_in?: Maybe<Array<Scalars['BigInt']>>;
  usersLength_not_in?: Maybe<Array<Scalars['BigInt']>>;
  depositSum?: Maybe<Scalars['BigInt']>;
  depositSum_not?: Maybe<Scalars['BigInt']>;
  depositSum_gt?: Maybe<Scalars['BigInt']>;
  depositSum_lt?: Maybe<Scalars['BigInt']>;
  depositSum_gte?: Maybe<Scalars['BigInt']>;
  depositSum_lte?: Maybe<Scalars['BigInt']>;
  depositSum_in?: Maybe<Array<Scalars['BigInt']>>;
  depositSum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  withdrawSum?: Maybe<Scalars['BigInt']>;
  withdrawSum_not?: Maybe<Scalars['BigInt']>;
  withdrawSum_gt?: Maybe<Scalars['BigInt']>;
  withdrawSum_lt?: Maybe<Scalars['BigInt']>;
  withdrawSum_gte?: Maybe<Scalars['BigInt']>;
  withdrawSum_lte?: Maybe<Scalars['BigInt']>;
  withdrawSum_in?: Maybe<Array<Scalars['BigInt']>>;
  withdrawSum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  proposalsCount?: Maybe<Scalars['BigInt']>;
  proposalsCount_not?: Maybe<Scalars['BigInt']>;
  proposalsCount_gt?: Maybe<Scalars['BigInt']>;
  proposalsCount_lt?: Maybe<Scalars['BigInt']>;
  proposalsCount_gte?: Maybe<Scalars['BigInt']>;
  proposalsCount_lte?: Maybe<Scalars['BigInt']>;
  proposalsCount_in?: Maybe<Array<Scalars['BigInt']>>;
  proposalsCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  debtsCount?: Maybe<Scalars['BigInt']>;
  debtsCount_not?: Maybe<Scalars['BigInt']>;
  debtsCount_gt?: Maybe<Scalars['BigInt']>;
  debtsCount_lt?: Maybe<Scalars['BigInt']>;
  debtsCount_gte?: Maybe<Scalars['BigInt']>;
  debtsCount_lte?: Maybe<Scalars['BigInt']>;
  debtsCount_in?: Maybe<Array<Scalars['BigInt']>>;
  debtsCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  maxProposalInterest?: Maybe<Scalars['BigInt']>;
  maxProposalInterest_not?: Maybe<Scalars['BigInt']>;
  maxProposalInterest_gt?: Maybe<Scalars['BigInt']>;
  maxProposalInterest_lt?: Maybe<Scalars['BigInt']>;
  maxProposalInterest_gte?: Maybe<Scalars['BigInt']>;
  maxProposalInterest_lte?: Maybe<Scalars['BigInt']>;
  maxProposalInterest_in?: Maybe<Array<Scalars['BigInt']>>;
  maxProposalInterest_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Pool_OrderBy {
  Id = 'id',
  LBalance = 'lBalance',
  LDebt = 'lDebt',
  LProposals = 'lProposals',
  PEnterPrice = 'pEnterPrice',
  PExitPrice = 'pExitPrice',
  Users = 'users',
  UsersLength = 'usersLength',
  DepositSum = 'depositSum',
  WithdrawSum = 'withdrawSum',
  ProposalsCount = 'proposalsCount',
  DebtsCount = 'debtsCount',
  MaxProposalInterest = 'maxProposalInterest'
}

export type PoolModule = {
  __typename?: 'PoolModule';
  /** module address */
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type PoolModule_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
};

export enum PoolModule_OrderBy {
  Id = 'id',
  Name = 'name'
}

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: Array<User>;
  userSnapshot?: Maybe<UserSnapshot>;
  userSnapshots: Array<UserSnapshot>;
  exitBalance?: Maybe<ExitBalance>;
  exitBalances: Array<ExitBalance>;
  balanceChange?: Maybe<BalanceChange>;
  balanceChanges: Array<BalanceChange>;
  earning?: Maybe<Earning>;
  earnings: Array<Earning>;
  debt?: Maybe<Debt>;
  debts: Array<Debt>;
  pledge?: Maybe<Pledge>;
  pledges: Array<Pledge>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  distributionEvent?: Maybe<DistributionEvent>;
  distributionEvents: Array<DistributionEvent>;
  defiHandlerCash?: Maybe<DefiHandlerCash>;
  defiHandlerCashes: Array<DefiHandlerCash>;
  commonHandlerCash?: Maybe<CommonHandlerCash>;
  commonHandlerCashes: Array<CommonHandlerCash>;
  defiAPR?: Maybe<DefiApr>;
  defiAPRs: Array<DefiApr>;
  poolModule?: Maybe<PoolModule>;
  poolModules: Array<PoolModule>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<User_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryUserSnapshotArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryUserSnapshotsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserSnapshot_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserSnapshot_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryExitBalanceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryExitBalancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExitBalance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExitBalance_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryBalanceChangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryBalanceChangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<BalanceChange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<BalanceChange_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryEarningArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryEarningsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Earning_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Earning_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDebtArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDebtsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Debt_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Debt_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryPledgeArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryPledgesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pledge_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Pledge_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryPoolArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryPoolsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Pool_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDistributionEventArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDistributionEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DistributionEvent_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DistributionEvent_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDefiHandlerCashArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDefiHandlerCashesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DefiHandlerCash_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DefiHandlerCash_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryCommonHandlerCashArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryCommonHandlerCashesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommonHandlerCash_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CommonHandlerCash_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDefiAprArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDefiApRsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DefiApr_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DefiApr_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryPoolModuleArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryPoolModulesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolModule_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PoolModule_Filter>;
  block?: Maybe<Block_Height>;
};

export enum Status {
  Proposed = 'PROPOSED',
  Executed = 'EXECUTED',
  PartiallyRepayed = 'PARTIALLY_REPAYED',
  Closed = 'CLOSED'
}

export type Subscription = {
  __typename?: 'Subscription';
  user?: Maybe<User>;
  users: Array<User>;
  userSnapshot?: Maybe<UserSnapshot>;
  userSnapshots: Array<UserSnapshot>;
  exitBalance?: Maybe<ExitBalance>;
  exitBalances: Array<ExitBalance>;
  balanceChange?: Maybe<BalanceChange>;
  balanceChanges: Array<BalanceChange>;
  earning?: Maybe<Earning>;
  earnings: Array<Earning>;
  debt?: Maybe<Debt>;
  debts: Array<Debt>;
  pledge?: Maybe<Pledge>;
  pledges: Array<Pledge>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  distributionEvent?: Maybe<DistributionEvent>;
  distributionEvents: Array<DistributionEvent>;
  defiHandlerCash?: Maybe<DefiHandlerCash>;
  defiHandlerCashes: Array<DefiHandlerCash>;
  commonHandlerCash?: Maybe<CommonHandlerCash>;
  commonHandlerCashes: Array<CommonHandlerCash>;
  defiAPR?: Maybe<DefiApr>;
  defiAPRs: Array<DefiApr>;
  poolModule?: Maybe<PoolModule>;
  poolModules: Array<PoolModule>;
};


export type SubscriptionUserArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<User_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionUserSnapshotArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionUserSnapshotsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserSnapshot_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserSnapshot_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionExitBalanceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionExitBalancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExitBalance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExitBalance_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionBalanceChangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionBalanceChangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<BalanceChange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<BalanceChange_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionEarningArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionEarningsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Earning_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Earning_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDebtArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDebtsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Debt_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Debt_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionPledgeArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionPledgesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pledge_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Pledge_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionPoolArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionPoolsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Pool_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDistributionEventArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDistributionEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DistributionEvent_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DistributionEvent_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDefiHandlerCashArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDefiHandlerCashesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DefiHandlerCash_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DefiHandlerCash_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionCommonHandlerCashArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionCommonHandlerCashesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommonHandlerCash_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CommonHandlerCash_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDefiAprArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDefiApRsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DefiApr_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DefiApr_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionPoolModuleArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionPoolModulesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolModule_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PoolModule_Filter>;
  block?: Maybe<Block_Height>;
};

export type User = {
  __typename?: 'User';
  /** address */
  id: Scalars['ID'];
  lBalance: Scalars['BigInt'];
  pBalance: Scalars['BigInt'];
  pInterestSum: Scalars['BigInt'];
  pLockedSum: Scalars['BigInt'];
  unlockLiquiditySum: Scalars['BigInt'];
  credit: Scalars['BigInt'];
  lastDistributionIndex?: Maybe<Scalars['BigInt']>;
  pledges: Array<Pledge>;
  debts: Array<Debt>;
  lends: Array<Debt>;
};


export type UserPledgesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pledge_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Pledge_Filter>;
};


export type UserDebtsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Debt_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Debt_Filter>;
};


export type UserLendsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Debt_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Debt_Filter>;
};

export type User_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lBalance?: Maybe<Scalars['BigInt']>;
  lBalance_not?: Maybe<Scalars['BigInt']>;
  lBalance_gt?: Maybe<Scalars['BigInt']>;
  lBalance_lt?: Maybe<Scalars['BigInt']>;
  lBalance_gte?: Maybe<Scalars['BigInt']>;
  lBalance_lte?: Maybe<Scalars['BigInt']>;
  lBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  lBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pBalance?: Maybe<Scalars['BigInt']>;
  pBalance_not?: Maybe<Scalars['BigInt']>;
  pBalance_gt?: Maybe<Scalars['BigInt']>;
  pBalance_lt?: Maybe<Scalars['BigInt']>;
  pBalance_gte?: Maybe<Scalars['BigInt']>;
  pBalance_lte?: Maybe<Scalars['BigInt']>;
  pBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  pBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pInterestSum?: Maybe<Scalars['BigInt']>;
  pInterestSum_not?: Maybe<Scalars['BigInt']>;
  pInterestSum_gt?: Maybe<Scalars['BigInt']>;
  pInterestSum_lt?: Maybe<Scalars['BigInt']>;
  pInterestSum_gte?: Maybe<Scalars['BigInt']>;
  pInterestSum_lte?: Maybe<Scalars['BigInt']>;
  pInterestSum_in?: Maybe<Array<Scalars['BigInt']>>;
  pInterestSum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pLockedSum?: Maybe<Scalars['BigInt']>;
  pLockedSum_not?: Maybe<Scalars['BigInt']>;
  pLockedSum_gt?: Maybe<Scalars['BigInt']>;
  pLockedSum_lt?: Maybe<Scalars['BigInt']>;
  pLockedSum_gte?: Maybe<Scalars['BigInt']>;
  pLockedSum_lte?: Maybe<Scalars['BigInt']>;
  pLockedSum_in?: Maybe<Array<Scalars['BigInt']>>;
  pLockedSum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  unlockLiquiditySum?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_not?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_gt?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_lt?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_gte?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_lte?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_in?: Maybe<Array<Scalars['BigInt']>>;
  unlockLiquiditySum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  credit?: Maybe<Scalars['BigInt']>;
  credit_not?: Maybe<Scalars['BigInt']>;
  credit_gt?: Maybe<Scalars['BigInt']>;
  credit_lt?: Maybe<Scalars['BigInt']>;
  credit_gte?: Maybe<Scalars['BigInt']>;
  credit_lte?: Maybe<Scalars['BigInt']>;
  credit_in?: Maybe<Array<Scalars['BigInt']>>;
  credit_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lastDistributionIndex?: Maybe<Scalars['BigInt']>;
  lastDistributionIndex_not?: Maybe<Scalars['BigInt']>;
  lastDistributionIndex_gt?: Maybe<Scalars['BigInt']>;
  lastDistributionIndex_lt?: Maybe<Scalars['BigInt']>;
  lastDistributionIndex_gte?: Maybe<Scalars['BigInt']>;
  lastDistributionIndex_lte?: Maybe<Scalars['BigInt']>;
  lastDistributionIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  lastDistributionIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum User_OrderBy {
  Id = 'id',
  LBalance = 'lBalance',
  PBalance = 'pBalance',
  PInterestSum = 'pInterestSum',
  PLockedSum = 'pLockedSum',
  UnlockLiquiditySum = 'unlockLiquiditySum',
  Credit = 'credit',
  LastDistributionIndex = 'lastDistributionIndex',
  Pledges = 'pledges',
  Debts = 'debts',
  Lends = 'lends'
}

export type UserSnapshot = {
  __typename?: 'UserSnapshot';
  id: Scalars['ID'];
  date: Scalars['BigInt'];
  user: Scalars['String'];
  lBalance: Scalars['BigInt'];
  pBalance: Scalars['BigInt'];
  pLockedSum: Scalars['BigInt'];
  pInterestSum: Scalars['BigInt'];
  unlockLiquiditySum: Scalars['BigInt'];
  credit: Scalars['BigInt'];
};

export type UserSnapshot_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  lBalance?: Maybe<Scalars['BigInt']>;
  lBalance_not?: Maybe<Scalars['BigInt']>;
  lBalance_gt?: Maybe<Scalars['BigInt']>;
  lBalance_lt?: Maybe<Scalars['BigInt']>;
  lBalance_gte?: Maybe<Scalars['BigInt']>;
  lBalance_lte?: Maybe<Scalars['BigInt']>;
  lBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  lBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pBalance?: Maybe<Scalars['BigInt']>;
  pBalance_not?: Maybe<Scalars['BigInt']>;
  pBalance_gt?: Maybe<Scalars['BigInt']>;
  pBalance_lt?: Maybe<Scalars['BigInt']>;
  pBalance_gte?: Maybe<Scalars['BigInt']>;
  pBalance_lte?: Maybe<Scalars['BigInt']>;
  pBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  pBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pLockedSum?: Maybe<Scalars['BigInt']>;
  pLockedSum_not?: Maybe<Scalars['BigInt']>;
  pLockedSum_gt?: Maybe<Scalars['BigInt']>;
  pLockedSum_lt?: Maybe<Scalars['BigInt']>;
  pLockedSum_gte?: Maybe<Scalars['BigInt']>;
  pLockedSum_lte?: Maybe<Scalars['BigInt']>;
  pLockedSum_in?: Maybe<Array<Scalars['BigInt']>>;
  pLockedSum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pInterestSum?: Maybe<Scalars['BigInt']>;
  pInterestSum_not?: Maybe<Scalars['BigInt']>;
  pInterestSum_gt?: Maybe<Scalars['BigInt']>;
  pInterestSum_lt?: Maybe<Scalars['BigInt']>;
  pInterestSum_gte?: Maybe<Scalars['BigInt']>;
  pInterestSum_lte?: Maybe<Scalars['BigInt']>;
  pInterestSum_in?: Maybe<Array<Scalars['BigInt']>>;
  pInterestSum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  unlockLiquiditySum?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_not?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_gt?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_lt?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_gte?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_lte?: Maybe<Scalars['BigInt']>;
  unlockLiquiditySum_in?: Maybe<Array<Scalars['BigInt']>>;
  unlockLiquiditySum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  credit?: Maybe<Scalars['BigInt']>;
  credit_not?: Maybe<Scalars['BigInt']>;
  credit_gt?: Maybe<Scalars['BigInt']>;
  credit_lt?: Maybe<Scalars['BigInt']>;
  credit_gte?: Maybe<Scalars['BigInt']>;
  credit_lte?: Maybe<Scalars['BigInt']>;
  credit_in?: Maybe<Array<Scalars['BigInt']>>;
  credit_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum UserSnapshot_OrderBy {
  Id = 'id',
  Date = 'date',
  User = 'user',
  LBalance = 'lBalance',
  PBalance = 'pBalance',
  PLockedSum = 'pLockedSum',
  PInterestSum = 'pInterestSum',
  UnlockLiquiditySum = 'unlockLiquiditySum',
  Credit = 'credit'
}

export type DefiAprsFromDateSubscriptionVariables = Exact<{
  fromDate: Scalars['BigInt'];
}>;


export type DefiAprsFromDateSubscription = (
  { __typename?: 'Subscription' }
  & { defiAPRs: Array<(
    { __typename?: 'DefiAPR' }
    & Pick<DefiApr, 'id' | 'dateFrom' | 'dateTo' | 'amountFrom' | 'amountTo' | 'duration' | 'apr' | 'aprDecimals'>
  )> }
);


export const DefiAprsFromDateDocument = gql`
    subscription DefiAprsFromDate($fromDate: BigInt!) {
  defiAPRs(first: 100, where: {dateTo_gt: $fromDate}) {
    id
    dateFrom
    dateTo
    amountFrom
    amountTo
    duration
    apr
    aprDecimals
  }
}
    `;

/**
 * __useDefiAprsFromDateSubscription__
 *
 * To run a query within a React component, call `useDefiAprsFromDateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDefiAprsFromDateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefiAprsFromDateSubscription({
 *   variables: {
 *      fromDate: // value for 'fromDate'
 *   },
 * });
 */
export function useDefiAprsFromDateSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DefiAprsFromDateSubscription, DefiAprsFromDateSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<DefiAprsFromDateSubscription, DefiAprsFromDateSubscriptionVariables>(DefiAprsFromDateDocument, baseOptions);
      }
export type DefiAprsFromDateSubscriptionHookResult = ReturnType<typeof useDefiAprsFromDateSubscription>;
export type DefiAprsFromDateSubscriptionResult = ApolloReactCommon.SubscriptionResult<DefiAprsFromDateSubscription>;