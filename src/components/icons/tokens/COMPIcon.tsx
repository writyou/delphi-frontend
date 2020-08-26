import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export function COMPIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <g fill="none" fillRule="evenodd">
        <circle cx="10" cy="10" r="10" fill="#191B1F" />
        <path
          fill="#00D395"
          d="M5.06 13.87a1.17 1.17 0 0 1-.56-1V10.6c0-.08.02-.17.07-.24a.49.49 0 0 1 .66-.18l5.12 2.99c.3.17.49.49.49.84v2.35a.59.59 0 0 1-.89.5l-4.89-3zm7.63-4.31c.3.18.48.5.48.84v4.77a.4.4 0 0 1-.2.34l-1.12.63a.26.26 0 0 1-.04.02V13.5a.98.98 0 0 0-.48-.84L6.84 9.98V7c0-.09.02-.17.07-.25a.48.48 0 0 1 .66-.17l5.12 2.98zm2.24-3.52c.3.17.48.5.48.84v6.97a.4.4 0 0 1-.2.34l-1.06.57V9.91a.98.98 0 0 0-.48-.83L9.09 6.32V3.5c0-.09.02-.17.07-.25a.49.49 0 0 1 .66-.17l5.12 2.97z"
        />
      </g>
    </SvgIcon>
  );
}
