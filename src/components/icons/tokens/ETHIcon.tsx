import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function ETHIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <g fill="none" fillRule="evenodd">
        <circle cx="16" cy="16" r="16" fill="#627EEA" />
        <g fill="#FFF" fillRule="nonzero">
          <path fillOpacity=".6" d="M16.5 4v8.9l7.5 3.3z" />
          <path d="M16.5 4L9 16.2l7.5-3.3z" />
          <path fillOpacity=".6" d="M16.5 22v6L24 17.6z" />
          <path d="M16.5 28v-6L9 17.6z" />
          <path fillOpacity=".2" d="M16.5 20.6l7.5-4.4-7.5-3.3z" />
          <path fillOpacity=".6" d="M9 16.2l7.5 4.4v-7.7z" />
        </g>
      </g>
    </SvgIcon>
  );
}

export { ETHIcon };
