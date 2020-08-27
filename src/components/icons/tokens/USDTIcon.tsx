import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function USDTIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <defs>
        <linearGradient id="88qjld3iva" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#79F8DC" />
          <stop offset="100%" stopColor="#26A17B" />
        </linearGradient>
      </defs>
      <g fill="none">
        <path
          fill="url(#88qjld3iva)"
          d="M10 0c5.522 0 10 4.478 10 10s-4.478 10-10 10S0 15.525 0 10 4.478 0 10 0z"
        />
        <path
          fill="#FFF"
          d="M11.408 8.885V7.396h3.403V5.13H5.547v2.267H8.95v1.489c-2.764.128-4.845.675-4.845 1.33 0 .656 2.08 1.203 4.845 1.331v4.764h2.46v-4.764c2.762-.128 4.837-.675 4.837-1.33-.003-.656-2.078-1.203-4.839-1.331zm.003 2.258c-.07.003-.425.025-1.22.025-.636 0-1.08-.016-1.238-.025v.003c-2.442-.108-4.267-.533-4.267-1.042 0-.508 1.822-.933 4.267-1.041v1.655c.16.011.616.04 1.25.04.758 0 1.138-.031 1.21-.04v-1.66c2.44.108 4.259.533 4.259 1.04-.006.51-1.825.934-4.261 1.045"
        />
      </g>
    </SvgIcon>
  );
}

export { USDTIcon };
