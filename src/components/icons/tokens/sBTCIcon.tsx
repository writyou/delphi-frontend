import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function sBTCIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <defs>
        <linearGradient id="h84hsid2va" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#A7C8FF" />
          <stop offset="100%" stopColor="#6E97FF" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="url(#h84hsid2va)"
          fillRule="nonzero"
          d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10z"
        />
        <path
          fill="#1E1A31"
          fillRule="nonzero"
          d="M11.933 12.362c0-.325.064-.577.192-.756.128-.179.31-.268.544-.268.174 0 .314.048.42.144.107.096.176.232.208.408.027-.208.094-.368.2-.48.107-.115.256-.172.448-.172.246 0 .439.093.58.28.139.187.208.45.208.792v1.116h-2.8v-1.064zm1.152.464v-.48c0-.128-.03-.228-.092-.3-.061-.072-.144-.108-.248-.108-.104 0-.186.036-.248.108-.061.072-.092.172-.092.3v.48h.68zm1.172 0v-.52c0-.144-.03-.255-.092-.332-.061-.08-.146-.12-.256-.12-.114 0-.202.04-.264.12-.064.08-.096.19-.096.332v.52h.708zm-2.324-1.639V8.971h.516v.808h2.284v.6H12.45v.808h-.516zm1.4-2.239c-.285 0-.534-.055-.748-.164-.216-.112-.382-.27-.5-.476-.117-.208-.176-.452-.176-.732 0-.219.043-.415.128-.588.086-.173.206-.313.36-.42.155-.107.334-.17.536-.192v.6c-.16.035-.285.108-.376.22-.093.11-.14.247-.14.412 0 .224.084.401.252.532.168.13.39.196.664.196.272 0 .494-.065.664-.196.168-.13.252-.308.252-.532 0-.165-.045-.303-.136-.412-.093-.112-.22-.185-.38-.22v-.6c.203.021.382.085.536.192.155.107.275.247.36.42.086.173.128.37.128.588 0 .28-.058.524-.176.732-.117.205-.282.364-.496.476-.216.11-.466.164-.752.164z"
        />
        <path fill="#1E1A31" d="M5.428 13.902L4.596 13.308 9.83 6.035 10.663 6.629z" opacity=".5" />
        <path
          fill="#1E1A31"
          d="M8.225 9.49h.279c1.286 0 2.33 1.04 2.33 2.322s-1.044 2.321-2.33 2.321H5.078c-.282 0-.511-.228-.511-.51 0-.281.229-.51.511-.51h3.426c.721 0 1.306-.582 1.306-1.301 0-.72-.585-1.302-1.306-1.302H6.896c-1.286 0-2.33-1.04-2.33-2.322s1.044-2.321 2.33-2.321h3.426c.282 0 .511.228.511.51 0 .281-.229.51-.511.51H6.896c-.721 0-1.306.582-1.306 1.301 0 .72.585 1.302 1.306 1.302h1.329z"
        />
      </g>
    </SvgIcon>
  );
}

export { sBTCIcon };