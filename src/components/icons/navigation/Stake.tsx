import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

function Stake(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && theme.gradients.main.svgLinear('StakeIconGradient')}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <g stroke="url(#StakeIconGradient)" strokeWidth=".7" transform="translate(2.5 4)">
            <rect
              stroke="url(#StakeIconGradient)"
              width="17.967"
              height="14.874"
              x=".35"
              y=".35"
              rx="2"
            />
            <path
              fill="url(#StakeIconGradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.73 4.085L3.73 11.715"
            />
            <ellipse
              cx="11.02"
              cy="7.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              rx="4.273"
              ry="4.288"
              stroke="url(#StakeIconGradient)"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.737 7.84L15.18 7.84"
              transform="rotate(45 10.958 7.84)"
              fill="url(#StakeIconGradient)"
            />
            <path
              fill="url(#StakeIconGradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.737 7.84L15.18 7.84"
              transform="scale(-1 1) rotate(45 0 -18.616)"
            />
          </g>
        ) : (
          <g stroke="currentColor" strokeWidth=".7" opacity=".5" transform="translate(2.5 4)">
            <rect width="17.967" height="14.874" x=".35" y=".35" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.73 4.085L3.73 11.715" />
            <ellipse
              cx="11.02"
              cy="7.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              rx="4.273"
              ry="4.288"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.737 7.84L15.18 7.84"
              transform="rotate(45 10.958 7.84)"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.737 7.84L15.18 7.84"
              transform="scale(-1 1) rotate(45 0 -18.616)"
            />
          </g>
        )}
      </g>
    </SvgIcon>
  );
}

export { Stake };
