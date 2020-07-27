import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Fish(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 83 30">
      <g fill="none" fillRule="evenodd">
        <path
          fill="#494A73"
          d="M22.104 13.214C28.88 4.404 38.272 0 50.28 0 68.29 0 82.203 9.033 82.44 14.781c.235 5.748-15.795 14.986-30.941 14.986-10.097 0-19.895-4.396-29.394-13.19-11.979 7.653-18.856 10.85-20.632 9.595-2.664-1.884 6.706-8.162 6.706-11.39 0-3.23-9.622-7.796-7.992-11.29 1.086-2.328 8.392.913 21.918 9.722z"
        />
        <circle cx="64.731" cy="13.319" r="5.714" fill="#0A0A0E" />
        <ellipse cx="65.696" cy="11.819" fill="#FFF" rx="1.25" ry="2.214" />
        <path
          stroke="#0A0A0E"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M65.284 27.571c-5.437-1.406-8.954-4.252-10.553-8.538"
        />
      </g>
    </SvgIcon>
  );
}

export { Fish };
