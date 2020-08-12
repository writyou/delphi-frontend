import React from 'react';

import { makeStyles } from 'utils/styles';
import { AlphaCat } from 'components/icons';
import { Link } from 'components';
import { DISCORD_URL, PREAUDIT_VERSION_ANNOUNCEMENT_URL } from 'env';

export function PreauditVersionWarning() {
  const classes = useStyles();

  return (
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
    </div>
  );
}

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 6,
    border: 'solid 1px #2d2d40',
  },
  catImage: {
    margin: '10px 20px 10px 50px',
    fontSize: '80px',
  },
  text: {
    color: 'white',
  },
  colored: {
    color: theme.colors.heliotrope,
  },
}));
