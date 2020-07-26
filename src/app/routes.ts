import build, { getParam } from 'build-route-tree';

const rawTree = {
  demo: null,
  summary: null,
  savings: {
    allocate: null,
    withdraw: null,
    id: getParam(null),
  },
  investing: {
    all: null,
    dca: null,
  },
};

export const routes = build(rawTree);
