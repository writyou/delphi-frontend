import * as React from 'react';

import { Metric, Label, Grid } from 'components';
import { Cat1 } from 'components/icons';
import { makeStyles } from 'utils/styles';

const valueMock = '1000';

export function ActiveMembers() {
  const classes = useStyles();

  return (
    <Grid container>
      <Cat1 className={classes.avatar} />
      <Metric
        title={
          <span className={classes.title}>
            <Label withComingSoon>ActiveMembers</Label>
          </span>
        }
        value={valueMock}
      />
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 50,
    marginRight: 14,
  },
  title: {
    fontSize: 12,
  },
}));
