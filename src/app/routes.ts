import build from 'build-route-tree';

const rawTree = {
  demo: null,
  summary: null,
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
