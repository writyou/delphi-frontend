import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function OkIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          fill="#0A0A0E"
          fillRule="nonzero"
          d="M11.53 20.04a8.58 8.58 0 0 0 8.51-8.52A8.58 8.58 0 0 0 11.52 3 8.58 8.58 0 0 0 3 11.52a8.58 8.58 0 0 0 8.53 8.52zm0-1.52c-3.89 0-7-3.11-7-7s3.1-7 6.99-7a7 7 0 1 1 0 14zm-1.05-2.83c.28 0 .52-.14.7-.4l4.08-6.42c.12-.17.21-.36.21-.54 0-.4-.35-.65-.72-.65-.23 0-.44.13-.6.4L10.45 14l-1.92-2.45c-.19-.24-.39-.34-.63-.34-.37 0-.67.3-.67.7 0 .18.07.36.2.53l2.31 2.85c.23.28.45.4.74.4z"
        />
      </g>
    </SvgIcon>
  );
}

export { OkIcon };
