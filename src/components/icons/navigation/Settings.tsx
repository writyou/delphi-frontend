import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

function Settings(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && theme.gradients.main.svgLinear('MyPoolsIconGradient')}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <path
            fill="url(#MyPoolsIconGradient)"
            d="M7.439 11.351c1.986 0 3.63-1.635 3.63-3.63 0-1.986-1.644-3.621-3.63-3.621C5.426 4.1 3.8 5.735 3.8 7.721c0 1.995 1.626 3.63 3.639 3.63zm9.132 0c1.995 0 3.63-1.635 3.63-3.63 0-1.986-1.635-3.621-3.63-3.621-2.004 0-3.63 1.635-3.63 3.621 0 1.995 1.626 3.63 3.63 3.63zm-9.132-1.38c-1.275 0-2.26-.984-2.26-2.25 0-1.257.985-2.276 2.26-2.276 1.257 0 2.25 1.02 2.25 2.276 0 1.266-.993 2.25-2.25 2.25zm9.132 0c-1.275 0-2.26-.984-2.26-2.25 0-1.257.985-2.276 2.26-2.276 1.265 0 2.25 1.02 2.25 2.276 0 1.266-.985 2.25-2.25 2.25zm-9.132 9.94c1.986 0 3.63-1.643 3.63-3.638 0-1.978-1.644-3.621-3.63-3.621-2.013 0-3.639 1.643-3.639 3.62 0 1.996 1.626 3.64 3.639 3.64zm9.132 0c1.995 0 3.63-1.643 3.63-3.638 0-1.978-1.635-3.621-3.63-3.621-2.004 0-3.63 1.643-3.63 3.62 0 1.996 1.626 3.64 3.63 3.64zm-9.132-1.388c-1.275 0-2.26-.985-2.26-2.241 0-1.257.985-2.277 2.26-2.277 1.257 0 2.25 1.02 2.25 2.277 0 1.256-.993 2.24-2.25 2.24zm9.132 0c-1.275 0-2.26-.985-2.26-2.241 0-1.257.985-2.277 2.26-2.277 1.265 0 2.25 1.02 2.25 2.277 0 1.256-.985 2.24-2.25 2.24z"
          />
        ) : (
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M7.612 11.207c1.96 0 3.595-1.635 3.595-3.603C11.207 5.634 9.572 4 7.612 4 5.617 4 4 5.635 4 7.604c0 1.968 1.617 3.603 3.612 3.603zm9.088 0c1.969 0 3.595-1.635 3.595-3.603C20.295 5.634 18.669 4 16.7 4c-1.995 0-3.612 1.635-3.612 3.604 0 1.968 1.617 3.603 3.612 3.603zm-9.088-.835c-1.564 0-2.777-1.213-2.777-2.768 0-1.539 1.213-2.787 2.777-2.787 1.547 0 2.769 1.248 2.769 2.787 0 1.555-1.222 2.768-2.769 2.768zm9.088 0c-1.564 0-2.777-1.213-2.777-2.768 0-1.539 1.213-2.787 2.777-2.787 1.547 0 2.769 1.248 2.769 2.787 0 1.555-1.222 2.768-2.769 2.768zm-9.088 9.343c1.96 0 3.595-1.635 3.595-3.604 0-1.968-1.635-3.603-3.595-3.603C5.617 12.508 4 14.143 4 16.11c0 1.97 1.617 3.604 3.612 3.604zm9.088 0c1.969 0 3.595-1.635 3.595-3.604 0-1.968-1.626-3.603-3.595-3.603-1.995 0-3.612 1.635-3.612 3.603 0 1.97 1.617 3.604 3.612 3.604zm-9.088-.835c-1.564 0-2.777-1.204-2.777-2.769 0-1.538 1.213-2.786 2.777-2.786 1.547 0 2.769 1.248 2.769 2.786 0 1.565-1.222 2.769-2.769 2.769zm9.088 0c-1.564 0-2.777-1.204-2.777-2.769 0-1.538 1.213-2.786 2.777-2.786 1.547 0 2.769 1.248 2.769 2.786 0 1.565-1.222 2.769-2.769 2.769z"
          />
        )}
      </g>
    </SvgIcon>
  );
}

export { Settings };
