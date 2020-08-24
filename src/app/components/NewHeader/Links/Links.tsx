import React from 'react';

import * as Link from '../../Link';
import { useStyles } from './Links.style';

const links: Link.models.Link[] = [
  {
    kind: 'external',
    label: 'Wiki',
    ref: 'https://wiki.akropolis.io/delphi/',
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
      <Link.Link link={link} />
    </div>
  );
}
