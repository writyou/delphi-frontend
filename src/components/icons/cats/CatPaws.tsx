import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

type PawColor = 'pink' | 'turquoise' | 'violet' | 'lilac';

export type Props = React.ComponentProps<typeof SvgIcon> & {
  variant?: PawColor;
};

const gradientColors: Record<PawColor, { start: string; stop: string }> = {
  pink: {
    start: '#EBA5B7',
    stop: '#F7CDD3',
  },
  turquoise: {
    start: '#AAEAED',
    stop: '#BEDFFF',
  },
  violet: {
    start: '#A095E4',
    stop: '#A095E4',
  },
  lilac: {
    start: '#A5B1EB',
    stop: '#D7CDF7',
  },
};

function CatPaws(props: Props) {
  const { variant = 'pink' } = props;

  return (
    <SvgIcon {...props} viewBox="0 0 51 51">
      <defs>
        <linearGradient id={`gradient-${variant}`} x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor={gradientColors[variant].start} />
          <stop offset="100%" stopColor={gradientColors[variant].stop} />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(.309 .324)">
        <path
          fill="#292950"
          d="M23.903 2.777c1.264 0 2.218-3.432 7.82-2.665 3.735.51 6.367 2.842 7.896 6.995 4.802.805 7.754 3.73 8.856 8.777 1.653 7.569 3.664 31.984-20.272 33.533C4.267 50.965.54 33.959.043 25.626-.458 17.293 3.518 9.06 9.406 9.06c0 0 .998-5.207 5.761-7.078 4.763-1.87 7.471.795 8.735.795z"
        />
        <ellipse cx="9.899" cy="20.996" fill={`url(#gradient-${variant})`} rx="2.778" ry="4.63" />
        <ellipse cx="40.455" cy="20.07" fill={`url(#gradient-${variant})`} rx="2.778" ry="4.63" />
        <ellipse
          cx="31.195"
          cy="12.2"
          fill={`url(#gradient-${variant})`}
          rx="3.704"
          ry="5.093"
          transform="rotate(-10 31.195 12.2)"
        />
        <ellipse
          cx="19.158"
          cy="12.2"
          fill={`url(#gradient-${variant})`}
          rx="3.704"
          ry="5.093"
          transform="rotate(10 19.158 12.2)"
        />
        <path
          fill={`url(#gradient-${variant})`}
          d="M16.485 29.664c1.373-4.617 4.14-6.926 8.303-6.926 4.163 0 7.154 1.958 8.975 5.875 3.628.74 5.443 2.287 5.443 4.641s-1.815 3.89-5.443 4.609c-1.56 2.262-4.11 3.394-7.65 3.394s-6.255-.959-8.144-2.876c-4.36.261-6.541-.988-6.541-3.748 0-2.759 1.686-4.415 5.057-4.969z"
        />
      </g>
    </SvgIcon>
  );
}

export { CatPaws };
