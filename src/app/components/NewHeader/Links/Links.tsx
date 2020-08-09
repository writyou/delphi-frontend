import React from 'react';

import * as Link from '../../Link';
import { routes } from '../../../routes';
import { useStyles } from './Links.style';

const links: Link.models.Link[] = [
  {
    kind: 'internal',
    label: 'My Summary',
    ref: routes.summary.getRoutePath(),
  },
  {
    kind: 'internal',
    label: 'Savings',
    ref: routes.savings.getRoutePath(),
  },
  {
    kind: 'internal',
    label: 'Investments',
    ref: routes.investments.getRoutePath(),
  },
  {
    kind: 'internal',
    label: 'DCA',
    ref: routes.dca.getRoutePath(),
  },
];

export const Links = () => {
  const classes = useStyles();

  return <div className={classes.root}>{links.map(renderLink)}</div>;
};

function renderLink(link: Link.models.Link) {
  const classes = useStyles();

  return (
    <div className={classes.link} key={link.label}>
      <Link.Link link={link} shouldRenderLabel />
    </div>
  );
}
