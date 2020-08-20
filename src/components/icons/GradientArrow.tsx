import React, { useMemo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { makeStyles, useTheme } from 'utils/styles';

const useStyles = makeStyles(
  () => ({
    root: {
      '& stop': {
        transition: '0.5s',
      },
    },
  }),
  { name: 'GradientArrow' },
);

function GradientArrow(props: React.ComponentProps<typeof SvgIcon>) {
  const { fill, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const gradientId = useMemo(() => Math.floor(Math.random() * 1000000000), []);

  return (
    <SvgIcon classes={{ root: classes.root }} {...rest} viewBox="0 0 44 11">
      <defs>
        <linearGradient id={`GradientArrow_${gradientId}`} x1="100%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor={fill || theme.colors.purpleHeart} />
          <stop offset="100%" stopColor={fill || theme.colors.heliotrope} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#GradientArrow_${gradientId})`}
        fillRule="evenodd"
        d="M756.327 706a.76.76 0 0 0 .518-.213l4.92-4.766a.694.694 0 0 0 0-1.042l-4.904-4.75c-.173-.16-.345-.229-.534-.229-.4 0-.706.282-.706.67 0 .19.07.365.204.487l1.664 1.644 2.377 2.109-1.765-.107h-39.387c-.416 0-.714.29-.714.7 0 .404.298.694.714.694h39.387l1.773-.107-2.385 2.109-1.664 1.644a.683.683 0 0 0-.204.487c0 .388.306.67.706.67z"
        transform="translate(-718 -695)"
      />
    </SvgIcon>
  );
}

export { GradientArrow };
