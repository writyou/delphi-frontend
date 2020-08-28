import build, { getParam } from 'build-route-tree';

const rawTree = {
  demo: null,
  summary: {
    harvest: null,
  },
  pools: {
    savings: null,
    investments: null,
    dca: null,
    staking: null,
  },
  rewards: null,
  savings: {
    allocate: null,
    withdraw: null,
    pool: {
      id: getParam(null),
    },
  },
  investments: {
    allocate: null,
    withdraw: null,
  },
  dca: {
    deposit: null,
    withdraw: null,
  },
  staking: null,
  settings: null,
};

export const routes = build(rawTree);
