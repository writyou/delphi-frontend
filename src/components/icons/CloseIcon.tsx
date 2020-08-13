import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function CloseIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        fill="currentColor"
        d="M15.72 15.72a1 1 0 0 0 0-1.4L9.38 8l6.34-6.32a1 1 0 0 0 0-1.39 1 1 0 0 0-1.4 0L8.02 6.62 1.67.28a1 1 0 0 0-1.39 0 1 1 0 0 0 0 1.38L6.62 8 .28 14.34a1 1 0 0 0 0 1.39 1 1 0 0 0 1.4 0L8 9.38l6.32 6.34a1 1 0 0 0 1.39 0z"
        opacity=".5"
      />
    </SvgIcon>
  );
}

export { CloseIcon };
