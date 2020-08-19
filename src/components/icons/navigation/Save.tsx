import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

function Save(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && theme.gradients.main.svgLinear('SaveIconGradient')}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <g>
            <path
              stroke="url(#SaveIconGradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth=".7"
              d="M4.495 5.49h4.4c2.193.853 3.473 2.102 3.837 3.747.547 2.467.762 6.38.762 6.879 0 .499-1.7 2.198-6.774 2.198S0 16.773 0 16.116s.34-4.68.868-6.879c.352-1.466 1.56-2.716 3.627-3.748zM8.626 5.258c1.922-2.555 2.76-4.025 2.513-4.412-.369-.579-1.39.342-1.741 0C9.047.506 8.795 0 8.018 0c-.517 0-1.036.282-1.556.846-.993-.77-1.724-.985-2.193-.643-.47.343-.749.631-.838.866C2.658.56 2.15.487 1.912.846c-.239.36.621 1.83 2.58 4.412M3.436 1.129L5.114 3.583M6.448.867L6.448 3.881M9.437.867L8.698 2.14"
              transform="translate(5 2.5)"
            />
            <path
              fill="url(#SaveIconGradient)"
              fillRule="nonzero"
              d="M6.753 16.124c.15 0 .262-.112.262-.263v-.588c1.209-.088 2.076-.788 2.076-1.821 0-.93-.62-1.495-1.885-1.758l-.19-.04V9.302c.699.071 1.208.477 1.327 1.057.048.175.143.279.318.279.183 0 .31-.128.31-.318 0-.064-.016-.128-.024-.2-.174-.779-.946-1.343-1.932-1.43v-.517c0-.16-.111-.263-.262-.263-.16 0-.263.096-.263.263v.516c-1.097.096-1.932.796-1.932 1.75 0 .867.612 1.415 1.837 1.702l.095.015v2.513c-.81-.08-1.367-.54-1.463-1.185-.048-.182-.151-.278-.318-.278-.175 0-.302.127-.302.318 0 .072.016.135.032.199.183.875.994 1.463 2.051 1.543v.596c0 .16.112.263.263.263zm-.263-4.605l-.047-.008c-.835-.214-1.249-.548-1.249-1.097 0-.588.54-1.034 1.296-1.113v2.218zm.525 3.15V12.29l.167.04c.899.222 1.272.564 1.272 1.145 0 .652-.54 1.129-1.439 1.192z"
              transform="translate(5 2.5)"
            />
          </g>
        ) : (
          <g>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth=".7"
              d="M4.495 5.49h4.4c2.193.853 3.473 2.102 3.837 3.747.547 2.467.762 6.38.762 6.879 0 .499-1.7 2.198-6.774 2.198S0 16.773 0 16.116s.34-4.68.868-6.879c.352-1.466 1.56-2.716 3.627-3.748zM8.626 5.258c1.922-2.555 2.76-4.025 2.513-4.412-.369-.579-1.39.342-1.741 0C9.047.506 8.795 0 8.018 0c-.517 0-1.036.282-1.556.846-.993-.77-1.724-.985-2.193-.643-.47.343-.749.631-.838.866C2.658.56 2.15.487 1.912.846c-.239.36.621 1.83 2.58 4.412M3.436 1.129L5.114 3.583M6.448.867L6.448 3.881M9.437.867L8.698 2.14"
              transform="translate(5 2.5)"
            />
            <path
              fill="currentColor"
              fillRule="nonzero"
              d="M6.753 16.124c.15 0 .262-.112.262-.263v-.588c1.209-.088 2.076-.788 2.076-1.821 0-.93-.62-1.495-1.885-1.758l-.19-.04V9.302c.699.071 1.208.477 1.327 1.057.048.175.143.279.318.279.183 0 .31-.128.31-.318 0-.064-.016-.128-.024-.2-.174-.779-.946-1.343-1.932-1.43v-.517c0-.16-.111-.263-.262-.263-.16 0-.263.096-.263.263v.516c-1.097.096-1.932.796-1.932 1.75 0 .867.612 1.415 1.837 1.702l.095.015v2.513c-.81-.08-1.367-.54-1.463-1.185-.048-.182-.151-.278-.318-.278-.175 0-.302.127-.302.318 0 .072.016.135.032.199.183.875.994 1.463 2.051 1.543v.596c0 .16.112.263.263.263zm-.263-4.605l-.047-.008c-.835-.214-1.249-.548-1.249-1.097 0-.588.54-1.034 1.296-1.113v2.218zm.525 3.15V12.29l.167.04c.899.222 1.272.564 1.272 1.145 0 .652-.54 1.129-1.439 1.192z"
              transform="translate(5 2.5)"
            />
          </g>
        )}
      </g>
    </SvgIcon>
  );
}

export { Save };
