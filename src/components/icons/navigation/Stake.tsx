import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

function Stake(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && <defs>{theme.gradients.main.svgLinear('StakeIconGradient')}</defs>}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <g transform="translate(2.5 4)">
            <rect
              width="18.667"
              height="15.574"
              stroke="url(#StakeIconGradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              rx="2"
            />
            <rect width="1" height="8.6" x="3.2" y="3.6" fill="url(#StakeIconGradient)" rx=".5" />
            <path
              fill="url(#StakeIconGradient)"
              d="M11 3.1c2.651 0 4.8 2.149 4.8 4.8s-2.149 4.8-4.8 4.8-4.8-2.149-4.8-4.8S8.349 3.1 11 3.1zm0 5.407l-2.366 2.367c.65.517 1.472.826 2.366.826.894 0 1.717-.31 2.366-.826L11 8.507zM7.2 7.9c0 .844.275 1.623.74 2.254L10.293 7.8 8.026 5.534C7.51 6.184 7.2 7.006 7.2 7.9zm6.774-2.366L11.707 7.8l2.353 2.354c.465-.63.74-1.41.74-2.254 0-.894-.31-1.717-.826-2.366zM11 4.1c-.844 0-1.623.275-2.254.74L11 7.093l2.254-2.253c-.63-.465-1.41-.74-2.254-.74z"
            />
          </g>
        ) : (
          <g stroke="currentColor" strokeWidth=".7" transform="translate(2.5 4)">
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
