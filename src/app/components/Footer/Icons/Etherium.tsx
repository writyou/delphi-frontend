// tslint:disable: max-line-length
import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'unset',
    color: theme.palette.type === 'light' ? '#afb7c7' : '#292835',
  },
}));

function Ethereum(props: React.ComponentProps<typeof SvgIcon>) {
  const classes = useStyles();

  return (
    <SvgIcon {...props} classes={classes} viewBox="0 0 160 40">
      <g fill="none">
        <rect width="159.2" height="40" rx="6" fill="currentColor" />
        <g stroke="#2D2D2D" strokeWidth=".3">
          <path fill="#FF826B" d="M65.6 6l-.2.7v18.2l.2.2 8.5-5z" />
          <path fill="#F3F047" d="M65.6 6L57 20l8.5 5z" />
          <path fill="#6A7DD1" d="M65.6 26.7h-.1V33.7l8.6-12z" />
          <path fill="#00B2D8" d="M65.6 33.6v-7l-8.5-5z" />
          <path fill="#A762B4" d="M65.6 25l8.5-5-8.5-3.8z" />
          <path fill="#00BF70" d="M57.1 20l8.5 5v-8.8z" />
        </g>
        <path
          fill="#FFF"
          d="M85 18c1 0 1.8.4 2.5 1.2.6.7 1 1.6 1 2.6 0 .2-.2.3-.4.3h-6c.1.8.4 1.5 1 2 .5.6 1.1.9 1.9.9 1 0 1.8-.4 2.4-1.3l.3-.1c.2 0 .3 0 .3.3v.1c-.6 1-1.6 1.6-3 1.6-1 0-1.8-.4-2.5-1.1a4 4 0 01-1-2.7c0-1 .3-1.9 1-2.6.7-.8 1.5-1.2 2.5-1.2zM82 21.5h5.7c0-.8-.4-1.5-.9-2-.5-.6-1.2-.9-2-.9s-1.3.3-1.9.9c-.5.5-.8 1.2-.9 2zm11-3.3h1.6c.2 0 .3 0 .3.3 0 .2-.1.3-.3.3H93v6.4c0 .2-.1.3-.3.3-.2 0-.3 0-.3-.3v-6.4h-1.6c-.2 0-.3-.1-.3-.3 0-.2.1-.3.3-.3h1.6v-2.4c0-.2 0-.3.3-.3.2 0 .3.1.3.3v2.4zm7.5-.2c.9 0 1.6.4 2 1 .6.7.8 1.4.8 2.3v3.9c0 .2 0 .3-.3.3-.2 0-.3-.1-.3-.3v-4c0-.6-.2-1.2-.5-1.7-.4-.6-1-.8-1.7-.8-.8 0-1.5.3-2 1a3.6 3.6 0 00-.5 2.5v3c0 .2 0 .3-.3.3-.2 0-.3-.1-.3-.3V12.4c0-.2.1-.3.3-.3.2 0 .3 0 .3.3v7.2c.6-1 1.4-1.6 2.5-1.6zm9 0c1 0 1.8.4 2.5 1.2a4 4 0 011 2.6c0 .2-.1.3-.3.3h-6c0 .8.4 1.5.9 2 .5.6 1.2 1 2 1 1 0 1.8-.5 2.4-1.4l.3-.1c.2 0 .3 0 .3.3v.1c-.7 1-1.7 1.6-3 1.6-1 0-1.9-.4-2.5-1.1-.7-.8-1-1.7-1-2.7 0-1 .3-1.9 1-2.6.6-.8 1.4-1.2 2.4-1.2zm-2.8 3.5h5.7c-.1-.8-.4-1.5-1-2-.5-.6-1.1-.9-1.9-.9s-1.4.3-2 .9c-.4.5-.7 1.2-.8 2zm12.3-3.3c.2 0 .3 0 .3.3 0 .1 0 .3-.3.3-.8.1-1.5.5-2 1.2-.3.6-.5 1.3-.5 2.2v3c0 .1-.1.2-.3.2-.2 0-.3 0-.3-.3v-6.6c0-.2 0-.3.3-.3.2 0 .3 0 .3.3v1.3c.2-.4.6-.8 1-1.1.5-.4 1-.5 1.5-.5zm5.6-.2c1 0 1.8.4 2.5 1.2.7.7 1 1.6 1 2.6 0 .2-.1.3-.3.3h-6c0 .8.4 1.5.9 2 .5.6 1.2 1 2 1 1 0 1.8-.5 2.4-1.4l.2-.1c.2 0 .3 0 .3.3v.1c-.6 1-1.6 1.6-3 1.6-1 0-1.8-.4-2.4-1.1a4 4 0 01-1-2.7c0-1 .3-1.9 1-2.6.6-.8 1.4-1.2 2.4-1.2zm-2.8 3.5h5.7c-.1-.8-.4-1.5-1-2-.5-.6-1.1-.9-1.9-.9-.7 0-1.4.3-2 .9-.4.5-.7 1.2-.8 2zm14.6-3.3c.2 0 .3.1.3.3v6.7c0 .2 0 .3-.3.3-.2 0-.3 0-.3-.3v-1.3c-.5 1.2-1.4 1.8-2.5 1.8-.8 0-1.5-.4-2-1-.5-.7-.7-1.4-.7-2.3v-3.9c0-.2 0-.3.3-.3.2 0 .3.1.3.3v4c0 .6.1 1.2.5 1.7.4.6 1 .8 1.6.8 1.7 0 2.5-1.3 2.5-4v-2.5c0-.2.1-.3.3-.3zm11.7-.2c.8 0 1.5.4 2 1s.7 1.4.7 2.2v4c0 .2 0 .3-.3.3-.2 0-.3-.1-.3-.3v-4c0-.7-.1-1.3-.5-1.7-.4-.6-1-.8-1.6-.8-.9 0-1.5.3-2 1.1-.3.7-.5 1.4-.5 2.3v3c0 .3-.1.4-.3.4-.2 0-.3-.1-.3-.3v-4c0-.7-.2-1.3-.6-1.7-.4-.6-1-.8-1.6-.8-.9 0-1.5.3-2 1-.4.5-.5 1.3-.5 2.4v3c0 .3-.1.4-.3.4-.2 0-.3-.1-.3-.3v-6.7c0-.2 0-.3.3-.3.2 0 .3 0 .3.3v1c.6-1 1.4-1.5 2.5-1.5 1.3 0 2.1.7 2.6 2 .5-1.3 1.4-2 2.7-2zM11.7 19.4h2.2c.6 0 1-.1 1.3-.4.3-.2.4-.5.4-1l-.1-.6a1 1 0 00-.4-.4l-.6-.2H11.7v2.6zm-1.1-3.6h3a29.2 29.2 0 011.7.2l.4.1.7.7c.2.3.3.6.3 1 0 .5 0 .9-.3 1.2-.2.3-.5.5-1 .7.6.1 1 .3 1.3.7.2.3.4.8.4 1.3 0 .3 0 .6-.2.8l-.5.8-.8.5c-.3.2-.6.2-1 .2h-4v-8.2zm1 7.3h2.8c.5 0 .9-.1 1.2-.4.2-.2.4-.6.4-1 0-.3 0-.5-.2-.7 0-.2-.2-.3-.4-.4l-.6-.3h-3.1V23zm11.7 1h-1v-1a2 2 0 01-.8.8c-.3.2-.7.3-1.1.3l-1-.2-.6-.4-.4-.7V18h.9v4c0 .4.1.7.3.9.2.2.5.3 1 .3l.7-.1.5-.4.4-.6V18h1v6zm2.5-7h-1v-1.2h1V17zm-1 1h1v6h-1v-6zm2.6-2.3h1V24h-1v-8.2zm3.8 2.3h1.2v.9h-1.2v3.9l.2.2h1v1h-.7L31 24a1 1 0 01-.4-.2.8.8 0 01-.3-.4V19h-1V18h1v-1.8h1v1.8zm6.2 3c0 .3 0 .6.2 1 0 .2.2.4.4.6a1.7 1.7 0 001.3.6A1.8 1.8 0 0041 22l.2-1c0-.3 0-.6-.2-.9a2 2 0 00-.4-.7 1.7 1.7 0 00-1.3-.6 1.8 1.8 0 00-1.7 1.3 3 3 0 00-.2 1zm-1 0c0-.5 0-.9.2-1.2l.5-1 1-.7a3 3 0 011.2-.2c.5 0 .9 0 1.3.2A2.6 2.6 0 0142 20a3.9 3.9 0 010 2.4l-.5 1c-.3.2-.6.5-1 .6-.3.2-.7.3-1.2.3s-.9-.1-1.2-.3a2.5 2.5 0 01-1.5-1.6l-.2-1.2zm7-3h.9v1c.4-.8 1-1.1 2-1.1l1 .1.6.5.3.7.1.8v4h-1v-4c0-.4 0-.7-.3-1-.2-.2-.5-.3-.9-.3a2 2 0 00-.8.2c-.2 0-.4.2-.5.4l-.4.5V24h-1v-5.9z"
        />
      </g>
    </SvgIcon>
  );
}

export { Ethereum as Etherium };
