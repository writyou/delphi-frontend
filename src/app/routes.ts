import build from 'build-route-tree';

const rawTree = {
  demo: null,
  summary: null,
  savings: null,
  investing: null,
};

export const routes = build(rawTree);
