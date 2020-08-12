import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export function SUSDIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <g fill="none" fillRule="evenodd">
        <path
          fill="#1E1A31"
          stroke="#FFF"
          strokeOpacity=".2"
          d="M30.98 15.99a14.99 14.99 0 1 0-29.98 0 14.99 14.99 0 0 0 29.98 0z"
        />
        <g fill="#FFF">
          <path d="M12.46 21.84l-1.35-.96 8.5-11.8 1.35.96z" opacity=".5" />
          <path d="M16.84 14.68h.45a3.78 3.78 0 1 1 0 7.54h-5.56a.83.83 0 1 1 0-1.65h5.56a2.12 2.12 0 1 0 0-4.23h-2.6a3.78 3.78 0 1 1 0-7.54h5.55a.83.83 0 1 1 0 1.66h-5.56a2.12 2.12 0 1 0 0 4.22h2.16z" />
        </g>
      </g>
    </SvgIcon>
  );
}
