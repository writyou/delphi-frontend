import build from 'build-route-tree';

const rawTree = {
  demo: null,
  summary: {
    savings: null,
    investment: null,
    dca: null,
    harvest: null,
  },
  savings: {
    allocate: null,
    withdraw: null,
  },
  investing: {
    all: null,
    dca: null,
  },
};

export const routes = build(rawTree);
