import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { Adaptive } from 'services/adaptability';
import { ThemeButton } from 'services/theme';
import { NavInline, Link } from 'components';
import { LogoWithNameIcon } from 'components/icons';
import { IMenuItem } from 'utils/types/common';
import { AuthButton } from 'features/auth';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { routes } from 'app/routes';

import { menuItems } from './constants';
import { useStyles } from './Header.style';
import { AppButton } from './components/AppButton/AppButton';

interface Props {
  authButtonText?: string;
  customNavItems?: IMenuItem[];
  CustomLogo?: typeof SvgIcon;
}

const AKROPOLIS_LINK = 'https://akropolis.io/';

export function Header({ authButtonText, customNavItems, CustomLogo }: Props) {
  const classes = useStyles();

  const api = useApi();
  const [connectedWallet] = useSubscribable(() => api.web3Manager.connectedWallet$, [], null);

  return (
    <header className={classes.root}>
      <div className={classes.logo}>
        {CustomLogo ? (
          <CustomLogo fontSize="inherit" />
        ) : (
          <Link
            className={classes.logo}
            href={AKROPOLIS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
          >
            <LogoWithNameIcon fontSize="inherit" />
          </Link>
        )}
      </div>
      <NavInline
        items={customNavItems || menuItems}
        className={classes.navInline}
        extraRight={[
          <React.Fragment key="0">
            <Adaptive to="tabletXS">
              <ThemeButton size="small" />
            </Adaptive>
            <Adaptive from="tabletXS">
              <ThemeButton />
            </Adaptive>
          </React.Fragment>,
          <AuthButton
            key="1"
            text={authButtonText}
            connectRedirectPath={routes.summary.getRedirectPath()}
          />,
          ...(connectedWallet ? [<AppButton key="2" />] : []),
        ]}
      />
    </header>
  );
}
