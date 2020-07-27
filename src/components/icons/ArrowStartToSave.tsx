import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function ArrowStartToSave(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 46 13">
      <defs>
        <linearGradient id="59ulv2qvsa" x1="99.823%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#574CF2" />
          <stop offset="100%" stopColor="#C43FF0" />
        </linearGradient>
      </defs>
      <path
        fill="none"
        fillRule="evenodd"
        stroke="url(#59ulv2qvsa)"
        d="M681.327 720c.189 0 .353-.069.518-.213l4.92-4.766c.157-.144.235-.327.235-.517 0-.198-.078-.38-.235-.525l-4.904-4.75c-.173-.16-.345-.229-.534-.229-.4 0-.706.282-.706.67 0 .19.07.365.204.487l1.664 1.644 2.377 2.109-1.765-.107h-39.387c-.416 0-.714.29-.714.7 0 .404.298.694.714.694h39.387l1.773-.107-2.385 2.109-1.664 1.644c-.125.122-.204.297-.204.487 0 .388.306.67.706.67z"
        transform="translate(-642 -708)"
      />
    </SvgIcon>
  );
}

export { ArrowStartToSave };
