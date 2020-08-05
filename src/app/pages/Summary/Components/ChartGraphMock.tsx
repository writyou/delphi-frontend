import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function ChartGraphMock(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 553 276">
      <defs>
        <linearGradient id="grad0" x1="99.823%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#4CF2A1" />
          <stop offset="100%" stopColor="#63D7DD" />
        </linearGradient>
        <linearGradient id="grad1" x1="99.823%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#F8E297" />
          <stop offset="100%" stopColor="#DDB863" />
        </linearGradient>
        <linearGradient id="grad2" x1="99.823%" x2=".174%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#F24CB6" />
          <stop offset="100%" stopColor="#FC87E2" />
        </linearGradient>
        <linearGradient id="grad3" x1="99.823%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#574CF2" />
          <stop offset="100%" stopColor="#63AFDD" />
        </linearGradient>
        <path
          id="ui5yclq1cb"
          d="M2.904 256.256c26.858-22.478 80.835-45.047 139.596-44.41 60.5.654 107.5 35.616 167.5-.669s89.735 32.429 141.72.668c23.325-14.251 32.78-47.303 84.28-47.303"
        />
        <path
          id="xln70q0z0e"
          d="M2.904 256.256C3 257.483 30 216.879 90 192.494c60-24.384 130.34 34.476 177.091 4.133 46.751-30.343 64.03-44.793 128.909-21.499 64.878 23.294 68.136-45.973 140.5-36.704"
        />
        <path
          id="lzrjt8rq1h"
          d="M2.904 256.256c3.581-36.385 31.122-93.912 73.983-119.216 64.29-37.957 111.71-19.977 162.889 0 51.179 19.977 104.906 14.456 156.224-5.042 51.318-19.498 51.318-41.41 137.227-41.992.391-.003.982-.006 1.773-.006"
        />
        <path
          id="434ivwc2kk"
          d="M2.904 256.256C12 221.914 52.557 177.006 90 161.074c70-29.787 115.32 26.804 200-15.074 84.276-41.678 154.075-69.132 243.71-31.48l1.29.546"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g strokeLinecap="round" strokeLinejoin="round" transform="translate(7)">
          <use stroke="url(#grad0)" strokeWidth="2" xlinkHref="#ui5yclq1cb" />
        </g>
        <g strokeLinecap="round" strokeLinejoin="round" transform="translate(7)">
          <use stroke="url(#grad1)" strokeWidth="2" xlinkHref="#xln70q0z0e" />
        </g>
        <path stroke="#FFF" d="M1 257.364L535 257.364" transform="translate(7)" />
        <path
          stroke="#FFF"
          d="M1 185.788L533 185.788M1 42.97L533.183 42.97M1 114.424L533 114.424"
          opacity=".1"
          transform="translate(7)"
        />
        <text
          fill="#FFF"
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontSize="10"
          fontWeight="300"
          opacity=".5"
          transform="translate(7)"
        >
          <tspan x="0" y="274">
            6:00 PM
          </tspan>
        </text>
        <text
          fill="#FFF"
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontSize="10"
          fontWeight="300"
          opacity=".5"
          transform="translate(7)"
        >
          <tspan x="160.345" y="274">
            11:00 PM
          </tspan>
        </text>
        <text
          fill="#FFF"
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontSize="10"
          fontWeight="300"
          opacity=".5"
          transform="translate(7)"
        >
          <tspan x="354.625" y="274">
            4:00 AM
          </tspan>
        </text>
        <text
          fill="#FFF"
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontSize="10"
          fontWeight="300"
          opacity=".5"
          transform="translate(7)"
        >
          <tspan x="493.845" y="274">
            10:00 AM
          </tspan>
        </text>
        <text
          fill="#FFF"
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontSize="10"
          fontWeight="300"
          opacity=".5"
          transform="translate(7)"
        >
          <tspan x="5" y="200">
            $350
          </tspan>
        </text>
        <text
          fill="#FFF"
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontSize="10"
          fontWeight="300"
          opacity=".5"
          transform="translate(7)"
        >
          <tspan x="5" y="127">
            $700
          </tspan>
        </text>
        <text
          fill="#FFF"
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontSize="10"
          fontWeight="300"
          opacity=".5"
          transform="translate(7)"
        >
          <tspan x="5" y="56">
            $1,000
          </tspan>
        </text>
        <path stroke="#FFF" d="M1.5 42.743L1.5 258.422" transform="translate(7)" />
        <g strokeLinecap="round" strokeLinejoin="round" transform="translate(7)">
          <use stroke="url(#grad2)" strokeWidth="2" xlinkHref="#lzrjt8rq1h" />
        </g>
        <g strokeLinecap="round" strokeLinejoin="round" transform="translate(7)">
          <use stroke="url(#grad3)" strokeWidth="2" xlinkHref="#434ivwc2kk" />
        </g>
      </g>
    </SvgIcon>
  );
}

export { ChartGraphMock };
