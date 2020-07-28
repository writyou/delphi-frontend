import build, { getParam } from 'build-route-tree';

const rawTree = {
  demo: null,
  summaryEmpty: null,
  summary: {
    savings: null,
    investment: null,
    dca: null,
    harvest: null,
  },
  savings: {
    allocate: null,
    withdraw: null,
    pool: {
      id: getParam(null),
    },
  },
  investing: {
    all: null,
    dca: null,
  },
};

export const routes = build(rawTree);
