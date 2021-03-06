import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

function MyHarvest(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && theme.gradients.main.svgLinear('MyHarvestIconGradient')}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <g strokeLinecap="round" strokeLinejoin="round">
            <path
              stroke="url(#MyHarvestIconGradient)"
              d="M3.495 19.23c.583.16.992.046 1.226-.343.351-.583.476-2.477 1.02-4.47.544-1.993 1.769-3.003 3.307-2.036 1.538.966 1.699 1.66 1.858 1.472.159-.187-.666-1.964-1.858-2.723-1.192-.76-2.242-.578-3.425.397-.788.65-1.298 1.86-1.53 3.63"
              transform="translate(3 3)"
            />
            <path
              stroke="url(#MyHarvestIconGradient)"
              d="M13.725 7.774c1.416 0 2.642.433 3.677 1.299 1.553 1.298 1.553 3.82 1.293 3.947-.26.127-2.89 0-4.295-1.567"
              transform="translate(3 3)"
            />
            <path
              stroke="url(#MyHarvestIconGradient)"
              d="M2.34 5.537c-.377-1.659-.664-2.75-.862-3.277C.763.365.058-.056.01.01-.092.147.6 1.858.864 4.26c.266 2.402.446 4.11.446 5.447"
              transform="translate(3 3)"
            />
            <path
              stroke="url(#MyHarvestIconGradient)"
              d="M4.12 15.493c-.854-5.877-.432-9.35 1.263-10.42"
              transform="translate(3 3)"
            />
            <path
              stroke="url(#MyHarvestIconGradient)"
              d="M2.591 18.17c-.78-2.309-1.281-5.283-1.281-8.075 0-3.096 2.74-8.784 3.01-8.784.271 0-1.498 4.503-1.48 7.636.018 3.133.997 5.476 1.37 6.864.371 1.39.028 2.755-.339 3.247-.366.492-1.031-.15-1.28-.887z"
              transform="translate(3 3)"
            />
            <path
              stroke="url(#MyHarvestIconGradient)"
              d="M10.692 6.707c-.12 1.355.193 2.596.935 3.722 1.114 1.69 2.056 1.964 2.41 1.773.354-.192 1.082-2.64-.252-4.355-.89-1.143-1.92-1.523-3.093-1.14z"
              transform="translate(3 3)"
            />
            <path
              stroke="url(#MyHarvestIconGradient)"
              d="M12.228 4.515c.595.814 1.33 1.34 2.205 1.578 1.882.512 4.499-.758 4.556-1.157.057-.399-.49-1.584-2.612-2.363-.503-.185-1.032-.273-1.586-.265"
              transform="translate(3 3)"
            />
            <path
              stroke="url(#MyHarvestIconGradient)"
              d="M9.999 3.842c.436-1.093 1.01-1.984 1.718-2.674C12.779.134 14.64-.284 14.974.202c.335.486.032 2.028-.986 3.106-.558.592-1.403.981-2.097 1.212"
              transform="translate(3 3)"
            />
            <path
              stroke="url(#MyHarvestIconGradient)"
              d="M5.383 5.074c.857 1.233 2.01 1.85 3.459 1.85 2.173 0 3.287-1.366 3.287-1.85S11.46 3.999 9.494 3.76c-1.31-.16-2.681.278-4.11 1.314z"
              transform="translate(3 3)"
            />
          </g>
        ) : (
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".7">
            <path
              d="M2.591 18.17c-.78-2.309-1.281-5.283-1.281-8.075 0-3.096 2.74-8.784 3.01-8.784.271 0-1.498 4.503-1.48 7.636.018 3.133.997 5.476 1.37 6.864.371 1.39.028 2.755-.339 3.247-.366.492-1.031-.15-1.28-.887z"
              transform="translate(3 3)"
            />
            <path
              d="M2.34 5.537c-.377-1.659-.664-2.75-.862-3.277C.763.365.058-.056.01.01-.092.147.6 1.858.864 4.26c.266 2.402.446 4.11.446 5.447M3.495 19.23c.583.16.992.046 1.226-.343.351-.583.476-2.477 1.02-4.47.544-1.993 1.769-3.003 3.307-2.036 1.538.966 1.699 1.66 1.858 1.472.159-.187-.666-1.964-1.858-2.723-1.192-.76-2.242-.578-3.425.397-.788.65-1.298 1.86-1.53 3.63M4.12 15.493c-.854-5.877-.432-9.35 1.263-10.42M10.692 6.707c-.12 1.355.193 2.596.935 3.722 1.114 1.69 2.056 1.964 2.41 1.773.354-.192 1.082-2.64-.252-4.355-.89-1.143-1.92-1.523-3.093-1.14zM12.228 4.515c.595.814 1.33 1.34 2.205 1.578 1.882.512 4.499-.758 4.556-1.157.057-.399-.49-1.584-2.612-2.363-.503-.185-1.032-.273-1.586-.265"
              transform="translate(3 3)"
            />
            <path
              d="M9.999 3.842c.436-1.093 1.01-1.984 1.718-2.674C12.779.134 14.64-.284 14.974.202c.335.486.032 2.028-.986 3.106-.558.592-1.403.981-2.097 1.212"
              transform="translate(3 3)"
            />
            <path
              d="M5.383 5.074c.857 1.233 2.01 1.85 3.459 1.85 2.173 0 3.287-1.366 3.287-1.85S11.46 3.999 9.494 3.76c-1.31-.16-2.681.278-4.11 1.314zM13.725 7.774c1.416 0 2.642.433 3.677 1.299 1.553 1.298 1.553 3.82 1.293 3.947-.26.127-2.89 0-4.295-1.567"
              transform="translate(3 3)"
            />
          </g>
        )}
      </g>
    </SvgIcon>
  );
}

export { MyHarvest };
