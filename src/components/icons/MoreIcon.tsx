import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { makeStyles } from 'utils/styles';

const useStyles = makeStyles({
  root: {
    width: 'unset',
  },
});

// tslint:disable:max-line-length
function MoreIcon(props: React.ComponentProps<typeof SvgIcon>) {
  const classes = useStyles();
  return (
    <SvgIcon {...props} classes={classes} viewBox="0 0 8 14">
      <path
        fill="currentColor"
        d="M1.46 13.05a.7.7 0 0 0 .5-.2L7.4 7.53A.7.7 0 0 0 7.64 7c0-.2-.08-.4-.22-.53L1.96 1.14a.68.68 0 0 0-.5-.2.7.7 0 0 0-.7.69c0 .19.08.37.21.5L5.95 7 .97 11.86c-.12.13-.2.3-.2.5 0 .4.3.7.7.7z"
      />
    </SvgIcon>
  );
}

export { MoreIcon };
