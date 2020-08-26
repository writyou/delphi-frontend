import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export function COMPIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <g fill="none" fillRule="evenodd">
        <circle cx="10" cy="10" r="10" fill="#191B1F" />
        <path
          fill="#00D395"
          d="M5.06 13.866c-.348-.212-.56-.59-.56-.996v-2.268c0-.087.023-.17.067-.245.135-.232.434-.311.666-.175l5.118 2.984c.3.175.484.494.484.841v2.35c0 .107-.03.214-.085.306-.17.275-.529.362-.805.193l-4.885-2.99zm7.629-4.306c.299.176.483.495.483.842v4.768c0 .141-.076.271-.198.34l-1.12.63c-.015.008-.03.014-.046.019V13.51c0-.342-.18-.66-.474-.837L6.84 9.985V6.997c0-.087.023-.17.067-.245.134-.233.434-.312.666-.175L12.69 9.56zm2.24-3.521c.3.173.485.496.485.843v6.964c0 .143-.08.275-.205.343l-1.062.573V9.914c0-.343-.18-.659-.472-.836L9.08 6.322V3.487c0-.086.024-.17.065-.245.135-.232.434-.311.667-.176l5.117 2.973z"
        />
      </g>
    </SvgIcon>
  );
}
