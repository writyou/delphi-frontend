import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export function CatPaws(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 42 22">
      <defs>
        <linearGradient id="catPaws-a" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#EBA5B7" />
          <stop offset="100%" stopColor="#F7CDD3" />
        </linearGradient>
        <linearGradient id="catPaws-b" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#EBA5B7" />
          <stop offset="100%" stopColor="#F7CDD3" />
        </linearGradient>
        <linearGradient id="catPaws-c" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#EBA5B7" />
          <stop offset="100%" stopColor="#F7CDD3" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <path
          fill="#0E0E17"
          stroke="#4E4E7F"
          d="M9.56 1.11c.5 0 .89-1.37 3.13-1.06 1.5.2 2.55 1.13 3.16 2.8 1.92.31 3.1 1.48 3.54 3.5.66 3.03 1.47 12.8-8.1 13.42C1.7 20.39.21 13.58.01 10.25c-.2-3.33 1.39-6.63 3.74-6.63 0 0 .4-2.08 2.3-2.83 1.91-.75 3 .32 3.5.32z"
        />
        <ellipse cx="3.96" cy="8.4" fill="url(#catPaws-a)" rx="1.11" ry="1.85" />
        <ellipse cx="16.18" cy="8.03" fill="url(#catPaws-a)" rx="1.11" ry="1.85" />
        <ellipse
          cx="12.48"
          cy="4.88"
          fill="url(#catPaws-b)"
          rx="1.48"
          ry="2.04"
          transform="rotate(-10 12.48 4.88)"
        />
        <ellipse
          cx="7.66"
          cy="4.88"
          fill="url(#catPaws-b)"
          rx="1.48"
          ry="2.04"
          transform="rotate(10 7.66 4.88)"
        />
        <path
          fill="url(#catPaws-c)"
          d="M6.6 11.87c.54-1.85 1.65-2.77 3.32-2.77a3.7 3.7 0 0 1 3.59 2.35c1.45.3 2.17.91 2.17 1.85 0 .94-.72 1.56-2.17 1.84-.63.91-1.65 1.36-3.06 1.36-1.42 0-2.5-.38-3.26-1.15-1.75.1-2.62-.4-2.62-1.5s.68-1.76 2.02-1.98z"
        />
        <g transform="matrix(-1 0 0 1 40 0)">
          <path
            fill="#0E0E17"
            stroke="#4E4E7F"
            d="M9.56 1.11c.5 0 .89-1.37 3.13-1.06 1.5.2 2.55 1.13 3.16 2.8 1.92.31 3.1 1.48 3.54 3.5.66 3.03 1.47 12.8-8.1 13.42C1.7 20.39.21 13.58.01 10.25c-.2-3.33 1.39-6.63 3.74-6.63 0 0 .4-2.08 2.3-2.83 1.91-.75 3 .32 3.5.32z"
          />
          <ellipse cx="3.96" cy="8.4" fill="url(#catPaws-a)" rx="1.11" ry="1.85" />
          <ellipse cx="16.18" cy="8.03" fill="url(#catPaws-a)" rx="1.11" ry="1.85" />
          <ellipse
            cx="12.48"
            cy="4.88"
            fill="url(#catPaws-b)"
            rx="1.48"
            ry="2.04"
            transform="rotate(-10 12.48 4.88)"
          />
          <ellipse
            cx="7.66"
            cy="4.88"
            fill="url(#catPaws-b)"
            rx="1.48"
            ry="2.04"
            transform="rotate(10 7.66 4.88)"
          />
          <path
            fill="url(#catPaws-c)"
            d="M6.6 11.87c.54-1.85 1.65-2.77 3.32-2.77a3.7 3.7 0 0 1 3.59 2.35c1.45.3 2.17.91 2.17 1.85 0 .94-.72 1.56-2.17 1.84-.63.91-1.65 1.36-3.06 1.36-1.42 0-2.5-.38-3.26-1.15-1.75.1-2.62-.4-2.62-1.5s.68-1.76 2.02-1.98z"
          />
        </g>
      </g>
    </SvgIcon>
  );
}
