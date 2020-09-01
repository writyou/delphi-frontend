import React from 'react';
import { PercentAmount } from '@akropolis-web/primitives';

import { FormattedAmount, Loading, Box } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { MAX_AVG_APY } from 'env';
import { MoreIcon } from 'components/icons';
import { makeStyles } from 'utils/styles';

export function UserSavingsPoolsAvgAPY() {
  const api = useApi();
  const avgAPYRD = useSubscribable(() => api.user.getSavingsPoolsAvgAPY$(), [api]);
  const classes = useStyles();

  return (
    <Loading data={avgAPYRD}>
      {avgAPY =>
        avgAPY.lt(MAX_AVG_APY) ? (
          <FormattedAmount sum={avgAPY} />
        ) : (
          <Box display="inline-flex" alignItems="center" flexWrap="nowrap">
            <MoreIcon className={classes.arrow} />
            <FormattedAmount sum={new PercentAmount(MAX_AVG_APY)} />
          </Box>
        )
      }
    </Loading>
  );
}

const useStyles = makeStyles(() => ({
  arrow: {
    marginRight: '0.45em',
    fontSize: '0.45em',
  },
}));
