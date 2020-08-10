import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function AlphaCat(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 80 80">
      <defs>
        <linearGradient id="AlphaCat-b" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#FECA77" />
          <stop offset="100%" stopColor="#FED798" />
          <stop offset="100%" stopColor="#8BFAFC" />
        </linearGradient>
        <circle id="AlphaCat-a" cx="40" cy="40" r="40" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="AlphaCat-c" fill="#fff">
          <use xlinkHref="#AlphaCat-a" />
        </mask>
        <use fill="url(#AlphaCat-b)" xlinkHref="#AlphaCat-a" />
        <g mask="url(#AlphaCat-c)">
          <g transform="translate(-2 15)">
            <path
              fill="#292950"
              d="M35 5.4c5.4.7 7.2 0 11 0 3.7 0 8.4-.8 10.9-2.3 2.5-1.5 7.3-4.6 10-2.3 2.8 2.3 1.3 10 1.3 15.3s3.3 4 7 9.7c3.7 5.6 6.7 8.8 4.9 13.7-1.8 4.8 2 7 3 8.3 1 1.3-1.2 4.7-1.2 6.8 0 2 4 5.8 4 9 0 3-20 12.4-35.5 12.4C35 76 4.3 70.6 2.6 68.9 1 67.2-1.2 60 .7 54.6s4.5-6.6 4.5-8.4c0-1.9-2.3-7 0-10.2 2.4-3.3 3.3-5.6 5.8-10.3 2.5-4.6 5.8-7 5.8-9.6 0-2.6-2.5-10.2-1-13 1.4-2.9 9.5-1 10.9 0C28 4 29.6 4.8 35 5.4z"
            />
            <path
              stroke="#0A0A0E"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M36.2 24.7c-3-2-5.8-2.3-8-1m16.3 10.5c4.3 4.3 9 5.8 14.3 4.4 3.4-.9 5.5-2.6 6.8-4.7m-21.1.3c-2.4 5-6.5 7.2-12.3 6.3-5.8-.9-9.4-5-10.7-12.2"
            />
            <path
              fill="#0A0A0E"
              d="M39.5 30.3c0-1.3.9-2.8 4-3.2 3-.4 3.8.4 4.4 1.6.5 1.2-.8 2.7-2 3.1-1 .4-.6 2-1.6 2-.7 0-1.4-.7-2-2-1.9-.1-2.8-.6-2.8-1.5z"
            />
            <ellipse cx="55.2" cy="22.8" fill="#FED798" rx="5.8" ry="5.7" />
            <ellipse cx="55.1" cy="22.7" fill="#000" rx="3.3" ry="4.4" />
            <path
              stroke="#0A0A0E"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M65 3.5c-3.5 3.3-4.4 6.6-2.6 9.9m-43-6.8c4-1.7 6.5-.4 7.4 4"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
}

export { AlphaCat };
