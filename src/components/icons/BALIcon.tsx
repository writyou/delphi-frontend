import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function BALIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <g fill="none" fillRule="evenodd">
        <circle cx="10" cy="10" r="10" fill="#21222B" />
        <g fill="#FFF" fillRule="nonzero" transform="translate(2.5 3.5)">
          <path d="M10.6 7.5c2.6.4 4.5 1.3 4.5 2.3 0 1.4-3.4 2.5-7.6 2.5-4.1 0-7.5-1.1-7.5-2.5 0-1 1.8-2 4.5-2.3a15.5 15.5 0 0 0 6 0h.1zM9.5 3.3c2.4.3 4 1 4 2s-2.6 2-6 2-6-1-6-2 1.7-1.7 4.1-2a12 12 0 0 0 3.8 0z" />
          <ellipse cx="4.5" cy="1.5" rx="4.5" ry="1.5" transform="translate(3)" />
        </g>
      </g>
    </SvgIcon>
  );
}

export { BALIcon };
