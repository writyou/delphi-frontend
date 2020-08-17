import React from 'react';
import cn from 'classnames';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { IconButton } from 'components';
import * as icons from 'components/icons/navigation';

import { routes } from '../../routes';
import * as Link from '../Link';
import { useStyles } from './Sidebar.style';
import * as components from './components';
import { sidebarStorage } from './sidebarStorage';

type PriorityLinks = {
  requiredLinks: Link.models.Link[];
  additionalLinks: Link.models.Link[];
};

const upperLinksList: PriorityLinks = {
  requiredLinks: [
    {
      kind: 'internal',
      label: 'My Summary',
      ref: routes.summary.getRoutePath(),
      renderIcon: makeIconRenderer(icons.Borrow),
    },
  ],
  additionalLinks: [
    {
      kind: 'internal',
      label: 'My Pools',
      ref: routes.savings.getRoutePath(),
      renderIcon: makeIconRenderer(icons.Borrow),
    },
    {
      kind: 'internal',
      label: 'My Harvest',
      ref: routes.investments.getRoutePath(),
      renderIcon: makeIconRenderer(icons.Borrow),
    },
  ],
};

const lowerLinksList: PriorityLinks = {
  requiredLinks: [],
  additionalLinks: [
    {
      kind: 'internal',
      label: 'Save',
      ref: routes.savings.getRoutePath(),
      renderIcon: makeIconRenderer(icons.Borrow),
    },
    {
      kind: 'internal',
      label: 'Invest',
      ref: routes.investments.getRoutePath(),
      renderIcon: makeIconRenderer(icons.Borrow),
    },
    {
      kind: 'internal',
      label: 'DCA',
      ref: routes.dca.getRoutePath(),
      renderIcon: makeIconRenderer(icons.Borrow),
    },
    {
      kind: 'internal',
      label: 'Stake',
      ref: routes.staking.getRoutePath(),
      renderIcon: makeIconRenderer(icons.Borrow),
    },
  ],
};

function getLinks$(api: ReturnType<typeof useApi>, links: PriorityLinks) {
  return api.user
    .getUser$()
    .pipe(
      map(isPoolUser => [...links.requiredLinks].concat(isPoolUser ? links.additionalLinks : [])),
    );
}

export const Sidebar: React.FC = () => {
  const classes = useStyles();
  const api = useApi();

  const [links] = useSubscribable(
    () =>
      combineLatest(getLinks$(api, upperLinksList), getLinks$(api, lowerLinksList)).pipe(
        map(([upperLinks, lowerLinks]) => ({ upperLinks, lowerLinks })),
      ),
    [api, upperLinksList, lowerLinksList],
  );

  const [isExpanded, setCloseSidebar] = React.useState(() => sidebarStorage.getItem('isExpanded'));

  const handleExpanded = () => {
    sidebarStorage.setItem('isExpanded', !isExpanded);
    setCloseSidebar(!isExpanded);
  };

  return (
    <div
      className={cn({
        [classes.root]: true,
        [classes.rootShort]: !isExpanded,
      })}
    >
      <div className={classes.upperPart}>
        <nav className={classes.upperLinks}>{links?.upperLinks.map(makeLinkRenderer())}</nav>
        <nav className={classes.lowerLinks}>{links?.lowerLinks.map(makeLinkRenderer())}</nav>
      </div>
      <div className={classes.lowerPart}>
        <div className={classes.lowerPart}>{renderSwitch()}</div>
      </div>
    </div>
  );

  function renderSwitch() {
    return (
      <IconButton
        className={cn(classes.switch, {
          [classes.switchInverted]: !isExpanded,
        })}
        onClick={handleExpanded}
      >
        <icons.Switch fontSize="inherit" />
      </IconButton>
    );
  }
};

function makeLinkRenderer() {
  return (link: Link.models.Link) => {
    return <components.Link key={link.label} link={link} />;
  };
}

function makeIconRenderer(Icon: typeof SvgIcon) {
  return (isActive: boolean) => (
    <Icon fontSize="inherit" {...(!isActive && { color: 'inherit' })} />
  );
}
