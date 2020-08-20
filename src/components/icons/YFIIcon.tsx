import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function YFIIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <g fill="none" fillRule="evenodd">
        <circle cx="10" cy="10" r="10" fill="#FFF" />
        <path fill="#000" fillRule="nonzero" d="M9.56 5.72h1v8.45h-1z" />
        <path
          fill="#000"
          fillRule="nonzero"
          d="M7.14 11.9a3.28 3.28 0 1 0 3.71-1.67v.98a2.34 2.34 0 1 1-3.14 2.2c0-.45.13-.89.4-1.26l.16 1.55.94-.12-.46-2.95-2.94.59.17.98 1.16-.3zm5.96-4.1c.19-.42.23-.73.23-1.22a3.28 3.28 0 1 0-4.08 3.18v-.98A2.34 2.34 0 1 1 12.2 7.5l-.52-1.38-.86.27.84 2.9 2.85-1.04-.35-.82-1.06.36z"
        />
      </g>
    </SvgIcon>
  );
}

export { YFIIcon };
