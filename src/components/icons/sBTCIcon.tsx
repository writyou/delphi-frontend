import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function sBTCIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 30 30">
      <g fill="none" fillRule="evenodd">
        <path fill="#6E97FF" fillRule="nonzero" d="M15 30a15 15 0 1 0 0-30 15 15 0 0 0 0 30z" />
        <path
          fill="#1E1A31"
          fillRule="nonzero"
          d="M17.9 18.54c0-.48.1-.86.29-1.13.19-.27.46-.4.81-.4a.9.9 0 0 1 .63.21c.16.15.27.35.32.62.04-.32.14-.56.3-.73a.87.87 0 0 1 .67-.25c.37 0 .66.14.87.42.2.28.31.67.31 1.18v1.68h-4.2v-1.6zm1.73.7v-.72c0-.2-.05-.34-.14-.45-.1-.1-.22-.16-.37-.16s-.28.05-.37.16c-.1.1-.14.26-.14.45v.72h1.02zm1.76 0v-.78a.79.79 0 0 0-.14-.5.46.46 0 0 0-.39-.18c-.17 0-.3.06-.4.18a.78.78 0 0 0-.14.5v.78h1.07zm-3.49-2.46v-3.32h.77v1.2h3.43v.9h-3.43v1.22h-.77zm2.1-3.36c-.43 0-.8-.08-1.12-.24a1.8 1.8 0 0 1-.75-.72 2.2 2.2 0 0 1-.27-1.1c0-.32.07-.62.2-.88a1.64 1.64 0 0 1 1.34-.92v.9a.96.96 0 0 0-.56.33.92.92 0 0 0-.21.62c0 .34.12.6.37.8.26.2.59.3 1 .3.4 0 .74-.1 1-.3.25-.2.37-.46.37-.8a.94.94 0 0 0-.2-.62.99.99 0 0 0-.57-.33v-.9c.3.03.57.13.8.3.24.15.42.36.54.62a2.2 2.2 0 0 1-.07 1.98c-.17.3-.42.55-.74.72-.33.16-.7.24-1.13.24z"
        />
        <path fill="#1E1A31" d="M8.14 20.85l-1.25-.89 7.86-10.9 1.24.88z" opacity=".5" />
        <path
          fill="#1E1A31"
          d="M12.19 14.23h.42a3.49 3.49 0 1 1 0 6.97H7.47a.77.77 0 1 1 0-1.53h5.14a1.96 1.96 0 1 0 0-3.9H10.2a3.49 3.49 0 1 1 0-6.97h5.13a.77.77 0 1 1 0 1.53H10.2a1.96 1.96 0 1 0 0 3.9h2z"
        />
      </g>
    </SvgIcon>
  );
}

export { sBTCIcon };