import React, { useState } from 'react';

import { AlphaCat, CloseIcon } from 'components/icons';
import { Link, IconButton } from 'components';
import { DISCORD_URL, PREAUDIT_VERSION_ANNOUNCEMENT_URL } from 'env';

import { useStyles } from './PreauditVersionWarning.style';
import { preauditVersionWarningStorage as warningStorage } from './preauditVersionWarningStorage';

export function PreauditVersionWarning() {
  const classes = useStyles();

  const [isHidden, setIsHidden] = useState(() => warningStorage.getItem('isHidden'));

  const handleCloseIconClick = React.useCallback(() => {
    warningStorage.setItem('isHidden', true);
    setIsHidden(true);
  }, []);

  return isHidden ? null : (
    <div className={classes.root}>
      <AlphaCat className={classes.catImage} />
      <div className={classes.text}>
        <span className={classes.colored}>This is capped preaudit version of Delphi</span>, please
        use it at your own risk. Only whitelisted users can interact with it (please check this{' '}
        <br />
        <Link
          href={PREAUDIT_VERSION_ANNOUNCEMENT_URL}
          color="textPrimary"
          target="_blank"
          rel="noopener noreferrer"
        >
          announcement
        </Link>
        ). Individual caps & restrictions apply. Please reach out in our{' '}
        <Link href={DISCORD_URL} color="textPrimary" target="_blank" rel="noopener noreferrer">
          Discord
        </Link>{' '}
        for any questions or issues!
      </div>
      <div className={classes.closeIcon}>
        <IconButton onClick={handleCloseIconClick}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
