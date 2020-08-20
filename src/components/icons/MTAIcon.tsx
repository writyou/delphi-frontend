import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function MTAIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <g fill="none" fillRule="evenodd">
        <circle cx="10" cy="10" r="10" fill="#000" />
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M5.06 7.3c0-.38-.02-.76-.06-1.14h1.74l.06.78c.2-.27.67-.92 1.9-.92 1.41 0 1.81.86 1.93 1.15.51-.98 1.34-1.13 1.98-1.13 1.24 0 1.74.73 1.87.97.33.53.3 1.27.3 1.8v3.34h-1.8V8.67c0-.65-.1-1.38-1.04-1.38-1.08 0-1.11 1-1.11 1.9v2.96H9.02V8.63C9.02 8.16 9 7.29 8 7.29c-1.14 0-1.14.96-1.14 1.38v3.48H5.06V7.3zM5 13.5h9.79v1.48H5V13.5z"
        />
      </g>
    </SvgIcon>
  );
}

export { MTAIcon };
