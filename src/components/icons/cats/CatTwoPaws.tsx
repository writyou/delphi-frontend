import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function CatTwoPaws(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 42 22">
      <defs>
        <linearGradient id="sv8ln47cza" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#EBA5B7" />
          <stop offset="100%" stopColor="#F7CDD3" />
        </linearGradient>
        <linearGradient id="awy75ru83b" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#EBA5B7" />
          <stop offset="100%" stopColor="#F7CDD3" />
        </linearGradient>
        <linearGradient id="6ttiuyk8ic" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#EBA5B7" />
          <stop offset="100%" stopColor="#F7CDD3" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <path
          fill="#0E0E17"
          stroke="#4E4E7F"
          d="M9.561 1.11c.506 0 .887-1.372 3.128-1.065 1.494.204 2.547 1.137 3.159 2.798 1.92.322 3.101 1.492 3.542 3.51.661 3.028 1.465 12.794-8.109 13.414C1.707 20.386.217 13.584.017 10.25c-.2-3.333 1.39-6.626 3.746-6.626 0 0 .4-2.083 2.304-2.831 1.905-.748 2.989.318 3.494.318z"
        />
        <ellipse cx="3.96" cy="8.399" fill="url(#sv8ln47cza)" rx="1.111" ry="1.852" />
        <ellipse cx="16.182" cy="8.028" fill="url(#sv8ln47cza)" rx="1.111" ry="1.852" />
        <ellipse
          cx="12.478"
          cy="4.88"
          fill="url(#awy75ru83b)"
          rx="1.481"
          ry="2.037"
          transform="rotate(-10 12.478 4.88)"
        />
        <ellipse
          cx="7.663"
          cy="4.88"
          fill="url(#awy75ru83b)"
          rx="1.481"
          ry="2.037"
          transform="rotate(10 7.663 4.88)"
        />
        <path
          fill="url(#6ttiuyk8ic)"
          d="M6.594 11.866c.55-1.847 1.656-2.77 3.321-2.77 1.665 0 2.862.783 3.59 2.35 1.452.295 2.177.914 2.177 1.856 0 .941-.725 1.556-2.177 1.843-.624.905-1.644 1.358-3.06 1.358-1.416 0-2.502-.384-3.257-1.15-1.745.104-2.617-.396-2.617-1.5 0-1.103.674-1.766 2.023-1.987z"
        />
        <g transform="matrix(-1 0 0 1 40 0)">
          <path
            fill="#0E0E17"
            stroke="#4E4E7F"
            d="M9.561 1.11c.506 0 .887-1.372 3.128-1.065 1.494.204 2.547 1.137 3.159 2.798 1.92.322 3.101 1.492 3.542 3.51.661 3.028 1.465 12.794-8.109 13.414C1.707 20.386.217 13.584.017 10.25c-.2-3.333 1.39-6.626 3.746-6.626 0 0 .4-2.083 2.304-2.831 1.905-.748 2.989.318 3.494.318z"
          />
          <ellipse cx="3.96" cy="8.399" fill="url(#sv8ln47cza)" rx="1.111" ry="1.852" />
          <ellipse cx="16.182" cy="8.028" fill="url(#sv8ln47cza)" rx="1.111" ry="1.852" />
          <ellipse
            cx="12.478"
            cy="4.88"
            fill="url(#awy75ru83b)"
            rx="1.481"
            ry="2.037"
            transform="rotate(-10 12.478 4.88)"
          />
          <ellipse
            cx="7.663"
            cy="4.88"
            fill="url(#awy75ru83b)"
            rx="1.481"
            ry="2.037"
            transform="rotate(10 7.663 4.88)"
          />
          <path
            fill="url(#6ttiuyk8ic)"
            d="M6.594 11.866c.55-1.847 1.656-2.77 3.321-2.77 1.665 0 2.862.783 3.59 2.35 1.452.295 2.177.914 2.177 1.856 0 .941-.725 1.556-2.177 1.843-.624.905-1.644 1.358-3.06 1.358-1.416 0-2.502-.384-3.257-1.15-1.745.104-2.617-.396-2.617-1.5 0-1.103.674-1.766 2.023-1.987z"
          />
        </g>
      </g>
    </SvgIcon>
  );
}

export { CatTwoPaws };
