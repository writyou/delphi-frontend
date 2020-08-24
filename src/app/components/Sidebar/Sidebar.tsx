import React from 'react';
import cn from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { IconButton, Loading } from 'components';
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

function getLinks$(links: PriorityLinks) {
  return [...links.requiredLinks].concat(links.additionalLinks);
}

const links = {
  upperLinks: getLinks$(upperLinksList),
  lowerLinks: getLinks$(lowerLinksList),
};

export const Sidebar: React.FC = () => {
  const classes = useStyles();
  const api = useApi();

  const accountRD = useSubscribable(() => api.web3Manager.account$, [api]);

  const [isExpanded, setCloseSidebar] = React.useState(() => sidebarStorage.getItem('isExpanded'));

  const handleExpanded = () => {
    sidebarStorage.setItem('isExpanded', !isExpanded);
    setCloseSidebar(!isExpanded);
  };

  return (
    <Loading data={accountRD}>
      {account =>
        account !== null ? (
          <div
            className={cn({
              [classes.root]: true,
              [classes.rootShort]: !isExpanded,
            })}
          >
            <div className={classes.upperPart}>
              <nav className={classes.upperLinks}>{links.upperLinks.map(renderLink)}</nav>
              <nav className={classes.lowerLinks}>{links.lowerLinks.map(renderLink)}</nav>
            </div>
            <div className={classes.lowerPart}>
              <div className={classes.lowerPart}>{renderSwitch()}</div>
            </div>
          </div>
        ) : null
      }
    </Loading>
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
