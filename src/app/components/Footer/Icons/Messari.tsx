// tslint:disable: max-line-length
import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'unset',
  },
  rect: {
    color: theme.palette.type === 'light' ? '#afb7c7' : '#292835',
  },
  ellipse: {
    color: theme.palette.type === 'light' ? '#b3bcce' : '#191b1f',
  },
}));

function Messari(props: React.ComponentProps<typeof SvgIcon>) {
  const classes = useStyles();

  return (
    <SvgIcon {...props} classes={{ root: classes.root }} viewBox="0 0 119 40">
      <defs />
      <g fill="none">
        <rect className={classes.rect} width="118.49" height="40" rx="6" fill="currentColor" />
        <g transform="translate(89.06 6.04)">
          <ellipse
            className={classes.ellipse}
            cx="11.94"
            cy="13.37"
            rx="7.66"
            ry="7.92"
            fill="currentColor"
          />
          <path
            fill="#FFF"
            d="M1.67 5.14L11.21.7c.3-.13.64-.13.93 0l9.35 4.4c.34.17.58.49.64.87.71 4.29.35 8.28-1.07 11.96-1.5 3.86-4.62 6.67-9.38 8.43C7 25.12 3.8 22.16 2.1 17.5.5 13.09.14 9.2 1.04 5.89c.1-.33.32-.6.62-.75zm12.1 2.51l-2.66 2.79-1.02-1.02a.59.59 0 00-.82 0 .57.57 0 000 .81l1.43 1.44a.6.6 0 00.84-.01l3.08-3.22a.57.57 0 00-.02-.81.59.59 0 00-.83.02zm2.08 3.5a.3.3 0 00-.08-.2.28.28 0 00-.4 0l-1.78 1.82a.3.3 0 00-.08.2v5.9c0 .07.02.13.07.19.1.12.28.13.4.03l1.77-1.6a.3.3 0 00.1-.21v-6.13zm-4.28 3.65c-.1.09-.25.09-.35 0l-.5-.4a.28.28 0 00-.17-.05.29.29 0 00-.28.29v4.23c0 .07.02.13.07.19.1.12.28.13.4.02l1.77-1.6a.3.3 0 00.1-.21v-2.75a.3.3 0 00-.07-.19.28.28 0 00-.4-.03l-.57.5zm-4.36-3.65v7.72c0 .16.12.3.28.3.06 0 .12-.03.17-.07l1.78-1.48a.3.3 0 00.1-.22v-4.44a.3.3 0 00-.08-.2L7.7 10.94a.28.28 0 00-.4 0 .3.3 0 00-.08.2z"
          />
        </g>
        <path
          fill="#FFF"
          d="M5.04 7.6h1.69l1.66 4.38 1.62-4.38h1.65v5.97h-1.23v-4l-1.56 4H7.83l-1.56-4v4H5.04V7.6zm8.48 0h4.03v1.1h-2.74v1.34h2.23v1.05H14.8v1.38h2.84v1.1h-4.13V7.6zm6.76 4.03c.02.3.14.53.36.7.22.19.51.28.88.28.3 0 .55-.07.74-.2a.6.6 0 00.29-.53.48.48 0 00-.16-.38c-.1-.1-.26-.17-.45-.22-.19-.05-.48-.12-.88-.2-.4-.07-.73-.17-1-.29a1.57 1.57 0 01-.65-.52 1.5 1.5 0 01-.26-.91c0-.35.1-.66.3-.93.18-.28.45-.5.79-.65.34-.16.72-.23 1.15-.23.44 0 .84.08 1.19.24.35.16.63.39.83.67.2.28.3.6.31.96h-1.26a.9.9 0 00-.32-.61 1.13 1.13 0 00-.75-.24c-.29 0-.51.06-.69.18a.59.59 0 00-.25.51c0 .16.05.29.15.37.1.1.25.16.44.22l.87.19c.4.07.74.17 1.01.28.28.1.5.27.67.5.17.22.25.52.25.9 0 .36-.1.69-.3.98-.2.28-.48.5-.83.67-.36.17-.76.25-1.2.25a3 3 0 01-1.29-.26 2.12 2.12 0 01-.88-.72c-.2-.3-.32-.65-.32-1.03l1.26.02zm6.12 0c.02.3.15.53.37.7.22.19.5.28.87.28.3 0 .55-.07.75-.2a.6.6 0 00.28-.53.48.48 0 00-.16-.38c-.1-.1-.25-.17-.44-.22l-.89-.2c-.4-.07-.72-.17-1-.29a1.57 1.57 0 01-.65-.52 1.51 1.51 0 01-.25-.91c0-.35.1-.66.29-.93.19-.28.45-.5.8-.65.33-.16.72-.23 1.15-.23.44 0 .83.08 1.18.24.35.16.63.39.83.67.2.28.31.6.32.96h-1.26a.9.9 0 00-.33-.61 1.13 1.13 0 00-.74-.24c-.29 0-.52.06-.69.18a.58.58 0 00-.26.51c0 .16.05.29.16.37.1.1.25.16.43.22l.88.19c.4.07.74.17 1.01.28.27.1.5.27.66.5.17.22.26.52.26.9 0 .36-.1.69-.3.98-.2.28-.48.5-.84.67-.35.17-.76.25-1.2.25-.48 0-.9-.08-1.28-.26a2.11 2.11 0 01-.88-.72c-.21-.3-.32-.65-.33-1.03l1.26.02zm4.48 1.94l2.2-5.97h1.54l2.18 5.97h-1.38l-.47-1.3h-2.28l-.46 1.3h-1.33zm2.14-2.34h1.58l-.8-2.27-.78 2.27zm7.6-3.63c.44 0 .82.08 1.16.24.33.16.59.4.77.7.19.3.28.65.28 1.05 0 .38-.1.71-.28 1-.18.3-.43.52-.75.68l1.18 2.3h-1.42l-1-2h-1.1v2h-1.28V7.6h2.44zm-1.15 2.9h1.05c.3 0 .55-.08.73-.25a.86.86 0 00.27-.66c0-.29-.1-.51-.27-.68a1.03 1.03 0 00-.73-.24h-1.05v1.83zm5.05-2.9h1.29v5.97h-1.29V7.6zM4.72 17.8h4.75v1.1H7.73v4.87H6.45v-4.88H4.72v-1.1zm8.73 0c.43 0 .82.07 1.15.24.34.16.6.39.78.7.18.3.27.64.27 1.04a1.78 1.78 0 01-1.03 1.68l1.19 2.3h-1.43l-1-2h-1.09v2H11V17.8h2.45zm-1.16 2.9h1.05c.3 0 .55-.09.73-.25a.86.86 0 00.27-.67c0-.28-.09-.5-.27-.67a1.03 1.03 0 00-.73-.25H12.3v1.83zm4.53 3.06l2.2-5.97h1.54l2.18 5.98h-1.38l-.47-1.31h-2.28l-.46 1.3h-1.33zm2.14-2.33h1.58l-.8-2.27-.78 2.27zm5.16 2.34v-5.98h1.17l2.54 3.77v-3.77h1.27v5.98h-1.17L25.38 20v3.77h-1.26zm7.86-1.95c.02.3.14.53.36.71.22.18.52.27.88.27.3 0 .55-.06.74-.2a.6.6 0 00.29-.52.48.48 0 00-.16-.38c-.1-.1-.25-.17-.44-.22-.2-.06-.5-.13-.9-.2-.39-.08-.72-.17-.99-.3a1.57 1.57 0 01-.65-.51 1.51 1.51 0 01-.25-.92c0-.35.1-.66.28-.93.2-.27.46-.49.8-.64.34-.16.72-.24 1.15-.24.44 0 .84.08 1.19.25.35.16.63.38.83.67.2.28.3.6.31.96h-1.26a.9.9 0 00-.32-.62 1.13 1.13 0 00-.75-.23c-.28 0-.51.06-.68.18a.59.59 0 00-.26.5c0 .17.05.29.15.38.1.09.25.16.44.21.19.06.48.12.88.2.4.07.73.16 1 .27.28.11.5.28.67.5.17.23.25.53.25.9s-.1.7-.3.98c-.2.29-.47.51-.83.68-.36.16-.76.25-1.2.25a3 3 0 01-1.29-.26 2.13 2.13 0 01-.88-.72c-.2-.31-.32-.66-.32-1.04l1.26.02zm7.62-4.03c.42 0 .8.08 1.13.25.33.16.59.39.77.7a2 2 0 01.26 1.04 1.79 1.79 0 01-1.03 1.73c-.33.17-.7.25-1.13.25h-1.16v2h-1.29V17.8h2.45zm-1.16 2.9h1.04c.3 0 .54-.08.72-.24a.87.87 0 00.26-.67c0-.28-.09-.5-.26-.67a1.01 1.01 0 00-.72-.25h-1.04v1.83zm3.68 3.07l2.2-5.97h1.54l2.18 5.98h-1.38l-.47-1.31h-2.28l-.46 1.3h-1.33zm2.13-2.33h1.6l-.8-2.27-.8 2.27zm7.61-3.64c.44 0 .82.08 1.16.25.33.16.59.39.77.7.18.3.28.64.28 1.04 0 .38-.1.72-.28 1.01-.18.3-.43.52-.75.67l1.18 2.3H52.8l-1-2h-1.1v2h-1.28V17.8h2.44zm-1.15 2.9h1.05c.3 0 .54-.08.72-.24a.86.86 0 00.27-.67c0-.28-.09-.5-.27-.67a1.03 1.03 0 00-.72-.25h-1.05v1.83zm5.05-2.9h4.03v1.1h-2.74v1.34h2.23v1.05h-2.23v1.39h2.83v1.1h-4.12v-5.98zm5.73 5.98v-5.98h1.17l2.54 3.77v-3.77h1.27v5.98H65.3L62.75 20v3.77H61.5zm6.6-3c0-.6.12-1.13.35-1.6.24-.45.58-.8 1.02-1.05.45-.25.97-.38 1.57-.38.47 0 .89.1 1.26.27a2.32 2.32 0 011.31 1.92h-1.29a1.4 1.4 0 00-.46-.81c-.24-.2-.54-.3-.89-.3-.48 0-.86.18-1.14.54-.28.36-.42.83-.42 1.42 0 .58.14 1.05.42 1.41.28.36.66.54 1.14.54.35 0 .65-.1.89-.3.23-.19.39-.46.46-.8h1.29a2.31 2.31 0 01-1.31 1.91c-.37.18-.8.28-1.26.28-.6 0-1.12-.13-1.57-.38-.44-.25-.78-.6-1.02-1.06-.23-.46-.35-1-.35-1.6zm6.22-2.98h1.5l1.34 2.45 1.42-2.45H80l-2.2 3.76v2.21H76.5v-2.21l-2.2-3.76zM4.53 28h1.36l1.44 4.42 1.48-4.42h1.33L8.1 33.96H6.57L4.53 28zm6.96 0h4.03v1.1h-2.75v1.34H15v1.05h-2.23v1.38h2.84v1.1h-4.13V28zm8.17 0c.43 0 .82.08 1.15.24.34.17.6.4.78.7.18.3.27.65.27 1.05a1.78 1.78 0 01-1.03 1.68l1.19 2.3h-1.43l-1-2H18.5v2h-1.28V28h2.44zm-1.16 2.9h1.06c.3 0 .54-.08.72-.25a.86.86 0 00.27-.66c0-.29-.09-.51-.27-.68a1.03 1.03 0 00-.72-.24H18.5v1.83zm5.06-2.9h1.28v5.97h-1.28V28zm3.14 0h3.96v1.1h-2.68v1.4h2.2v1.05h-2.2v2.42H26.7V28zm5.5 0h1.28v5.97H32.2V28zm3.14 0h4.03v1.1h-2.74v1.34h2.23v1.05h-2.23v1.38h2.83v1.1h-4.12V28zm5.73 0h2.08c.6 0 1.13.13 1.6.38.45.25.8.6 1.06 1.06.25.45.37.97.37 1.55 0 .58-.12 1.1-.37 1.54-.25.46-.6.81-1.07 1.06-.46.26-.99.38-1.59.38h-2.08V28zm2.08 4.9c.55 0 .97-.17 1.27-.52.3-.35.45-.81.45-1.4 0-.57-.15-1.04-.45-1.39-.3-.35-.72-.52-1.27-.52h-.8v3.84h.8z"
        />
      </g>
    </SvgIcon>
  );
}

export { Messari };
