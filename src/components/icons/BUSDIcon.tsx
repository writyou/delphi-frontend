import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export function BUSDIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 22 22">
      <defs>
        <linearGradient id="1twusdtxfa" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#FFEEB8" />
          <stop offset="100%" stopColor="#FECB27" />
        </linearGradient>
      </defs>
      <g fill="none">
        <path
          fill="url(#1twusdtxfa)"
          d="M9.987 0c5.517 0 9.988 4.472 9.988 9.987 0 5.517-4.471 9.988-9.988 9.988C4.472 19.975 0 15.503 0 9.987 0 4.472 4.472 0 9.987 0z"
        />
        <path
          d="M10.094 3.394l1.648 1.71-4.149 4.203-1.648-1.669zm2.448 2.551l1.635 1.666-6.598 6.566-1.634-1.627zM5.075 8.38l1.681 1.701-1.681 1.661-1.681-1.661zm10.018.115l1.634 1.666-6.597 6.566-1.635-1.626z"
          fill="#000"
        />
      </g>
    </SvgIcon>
  );
}
