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
      renderIcon: makeIconRenderer(icons.Account),
    },
  ],
  additionalLinks: [
    {
      kind: 'internal',
      label: 'My Pools',
      ref: routes.pools.getRoutePath(),
      renderIcon: makeIconRenderer(icons.MyPools),
    },
    {
      kind: 'internal',
      label: 'My Harvest',
      ref: routes.rewards.getRoutePath(),
      renderIcon: makeIconRenderer(icons.MyHarvest),
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
      renderIcon: makeIconRenderer(icons.Save),
    },
    {
      kind: 'internal',
      label: 'Invest',
      ref: routes.investments.getRoutePath(),
      renderIcon: makeIconRenderer(icons.Invest),
    },
    {
      kind: 'internal',
      label: 'DCA',
      ref: routes.dca.getRoutePath(),
      renderIcon: makeIconRenderer(icons.DCA),
    },
    {
      kind: 'internal',
      label: 'Stake',
      ref: routes.staking.getRoutePath(),
      renderIcon: makeIconRenderer(icons.Stake),
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

  const [account] = useSubscribable(() => api.web3Manager.account$, [], null);

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

  if (!account) {
    return null;
  }

  return (
    <div
      className={cn({
        [classes.root]: true,
        [classes.rootShort]: !isExpanded,
      })}
    >
      <div className={classes.upperPart}>
        <nav className={classes.upperLinks}>{links?.upperLinks.map(renderLink)}</nav>
        <nav className={classes.lowerLinks}>{links?.lowerLinks.map(renderLink)}</nav>
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

  function renderLink(link: Link.models.Link) {
    return (
      <div key={link.label} className={classes.link}>
        <Link.Link link={link} />
      </div>
    );
  }
};

function makeIconRenderer(Icon: typeof SvgIcon) {
  return (isActive: boolean) => (
    <Icon fontSize="inherit" {...(!isActive && { color: 'inherit' })} />
  );
}
