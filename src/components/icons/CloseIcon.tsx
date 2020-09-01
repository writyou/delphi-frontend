import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function CloseIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 17 17">
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 15.085L15.085 0" transform="translate(1 1)" />
        <path d="M0 15.085L15.085 0" transform="translate(1 1) matrix(-1 0 0 1 15.085 0)" />
      </g>
    </SvgIcon>
  );
}

export { CloseIcon };
