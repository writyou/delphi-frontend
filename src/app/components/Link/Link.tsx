import React from 'react';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';

import { useStyles } from './style';
import * as models from './models';

type Props = {
  link: models.Link;
};

export const Link: React.FC<Props> = props => {
  const { link } = props;

  switch (link.kind) {
    case 'internal':
      return renderInternalLink(link);

    case 'external':
      return renderExternalLink(link);

    default: {
      const badLink: never = link;
      console.error('bad link kind', badLink);

      return null;
    }
  }

  function renderExternalLink(x: models.ExternalLink) {
    const classes = useStyles();

    const { label, ref } = x;

    return (
      <a target="_blank" rel="noopener noreferrer" className={classes.root} href={ref}>
        <div className={classes.label}>{label}</div>
      </a>
    );
  }

  function renderInternalLink(x: models.InternalLink) {
    const classes = useStyles();

    const { label, ref, renderIcon } = x;
    const isActive = !!useRouteMatch(ref);

    return (
      <NavLink key={label} to={ref} className={classes.root} activeClassName={classes.active}>
        {renderIcon && <div className={classes.icon}>{renderIcon(isActive)}</div>}
        <div className={classes.label}>{label}</div>
      </NavLink>
    );
  }
};
