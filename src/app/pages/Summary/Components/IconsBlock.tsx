import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { TokenIcon } from 'components';

type Props = {
  icons: string[];
};

export function IconsBlock(props: Props) {
  const classes = useStyles();
  const { icons } = props;

  return (
    <div className={classes.root}>
      {icons.map(icon => {
        return (
          <div className={classes.icon} key={icon}>
            <TokenIcon tokenAddress={icon} />
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
    },
    icon: {
      marginLeft: -7,
    },
  }),
  { name: 'IconsBlock' },
);
