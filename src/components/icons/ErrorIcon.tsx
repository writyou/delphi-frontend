import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function ErrorIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          fill="#0A0A0E"
          fillRule="nonzero"
          d="M12.01 20.52A8.58 8.58 0 0 0 20.53 12c0-4.66-3.87-8.52-8.53-8.52S3.48 7.34 3.48 12a8.59 8.59 0 0 0 8.53 8.52zm0-1.52c-3.88 0-7-3.1-7-7 0-3.89 3.1-7 7-7a7 7 0 1 1 0 14zm2.8-3.49c.4 0 .7-.3.7-.7 0-.2-.07-.35-.21-.5l-2.31-2.3 2.32-2.33a.69.69 0 0 0-.48-1.18c-.2 0-.35.07-.5.22L12 11.04 9.68 8.73a.63.63 0 0 0-.48-.2.68.68 0 0 0-.5 1.16l2.32 2.32-2.31 2.32c-.14.13-.2.3-.2.49 0 .38.3.7.69.7.2 0 .37-.08.5-.22L12 13l2.31 2.31c.13.13.3.21.5.21z"
        />
      </g>
    </SvgIcon>
  );
}

export { ErrorIcon };
