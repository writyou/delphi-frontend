import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { NavInline, Link } from 'components';
import { LogoWithNameIcon } from 'components/icons';
import { IMenuItem } from 'utils/types/common';

import { menuItems } from './constants';
import { useStyles } from './Header.style';
import { AppButton } from './components/AppButton/AppButton';

interface Props {
  customNavItems?: IMenuItem[];
  CustomLogo?: typeof SvgIcon;
}

const AKROPOLIS_LINK = 'https://akropolis.io/';

export function Header({ customNavItems, CustomLogo }: Props) {
  const classes = useStyles();

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
          <div className={classes.appButton}>
            <AppButton key="2" />
          </div>,
        ]}
      />
    </header>
  );
}
