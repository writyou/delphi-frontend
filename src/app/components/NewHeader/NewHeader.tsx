import React from 'react';
import { Link } from 'react-router-dom';

import { AuthButton } from 'features/auth';
import { MintTestnetTokenButton } from 'features/mintTestnetToken';
import { ETH_NETWORK_CONFIG } from 'env';

import * as CustomLink from '../Link';
import { useStyles } from './NewHeader.style';
import { Logo } from './icons';
import { Links } from './Links';

const wikiLink: CustomLink.models.Link = {
  kind: 'external',
  label: 'Wiki',
  ref: 'https://wiki.akropolis.io/delphi/',
};

export const NewHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.leftPart}>
        <Link to="/">
          <Logo />
        </Link>
        <nav className={classes.links}>
          <Links />
        </nav>
      </div>
      <div className={classes.rightPart}>
        <CustomLink.Link link={wikiLink} shouldRenderLabel />
        {ETH_NETWORK_CONFIG.id !== 1 && (
          <div className={classes.button}>
            <MintTestnetTokenButton color="primary" variant="outlined" />
          </div>
        )}
        <div className={classes.button}>
          <AuthButton disconnectRedirectPath="/" />
        </div>
      </div>
    </header>
  );
};
