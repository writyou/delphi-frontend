import React from 'react';
import { makeStyles } from '@akropolis-web/styles';

import { CatTwoPaws } from 'components/icons';
import { Link, Loading, Grid } from 'components';
import { REWARDS_TABLE_URL } from 'env';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

export function RewardsClaimRulesMessage() {
  const classes = useStyles();
  const api = useApi();
  const rewardsRD = useSubscribable(() => api.user.getRewardsData$(), [api]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}>
        <CatTwoPaws className={classes.paws} />
      </Grid>
      <Grid item xs={11}>
        <Loading data={rewardsRD}>
          {rewards => (
            <div className={classes.text}>
              {`Pool harvests are claimed once per day${
                rewards.length ? '.' : ' — come back later to see your rewards!'
              }`}{' '}
              If you want to see AKRO & ADEL rewards — please check{' '}
              <Link
                href={REWARDS_TABLE_URL}
                color="textPrimary"
                target="_blank"
                rel="noopener noreferrer"
              >
                this gsheet
              </Link>
            </div>
          )}
        </Loading>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      backgroundColor: '#212131',
      borderRadius: 6,
      padding: '10px 30px 10px 10px',
    },
    text: {
      fontSize: 12,
      lineHeight: 1.5,
      paddingLeft: 10,
    },
    paws: {
      fontSize: 40,
      height: 22,
    },
  }),
  { name: 'RewardsClaimRulesMessage' },
);
