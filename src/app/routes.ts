import build, { getParam } from 'build-route-tree';

const rawTree = {
  demo: null,
  summary: {
    savings: null,
    investment: null,
    dca: null,
    'my-savings-pools': null,
    harvest: null,
  },
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
};

export const routes = build(rawTree);
