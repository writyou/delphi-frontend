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
        <span className={classes.colored}>This is capped preaudit version of Delphi</span>. At this
        time, only whitelisted users can interact with the Delphi smart-contract system (“Delphi”),
        please check this{' '}
        <Link
          href={PREAUDIT_VERSION_ANNOUNCEMENT_URL}
          color="textPrimary"
          target="_blank"
          rel="noopener noreferrer"
        >
          announcement
        </Link>{' '}
        for more details. Individual caps & restrictions apply. Any use of Delphi is at your own
        risk. Accordingly, Akropolis is not responsible or liable for any loss or damage of any sort
        incurred by you. Please reach out in our{' '}
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
    padding: '10px 50px',
    background: theme.colors.blackRussian,
  },
  catImage: {
    marginRight: 20,
    fontSize: '80px',
  },
  text: {
    color: 'white',
    fontWeight: 300,
  },
  colored: {
    color: theme.colors.heliotrope,
  },
}));
