import * as React from 'react';
import cn from 'classnames';

import { HiddenSvgGradient } from 'components/HiddenSvgGradient';
import { makeStyles, useTheme } from 'utils/styles';

import { SocialLink } from '../SocialLink/SocialLink';

interface IProps {
  direction?: 'row' | 'column';
}

// [url, need_to_fill_svg-paths]
const links: Array<[string, boolean]> = [
  ['https://github.com/akropolisio', true],
  ['https://twitter.com/akropolisio', true],
  ['https://t.me/akropolis_official', true],
  ['https://medium.com/akropolis', true],
  ['https://discord.gg/Y58CGUW', true],
  ['https://defipulse.com/blog/delphi', true],
];

function AkropolisSocialLinks(props: IProps) {
  const { direction = 'row' } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={cn(classes.root, { [classes[direction]]: true })}>
      <HiddenSvgGradient>{theme.gradients.main.svgLinear('socialLinksGradient')}</HiddenSvgGradient>
      {links.map(([link, needToFill]) => (
        <SocialLink
          key={link}
          className={cn(classes.link, { [classes.fillPath]: needToFill })}
          href={link}
        />
      ))}
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      justifyContent: 'center',

      '&$row': {
        flexDirection: 'row',
      },

      '&$column': {
        flexDirection: 'column',
      },
    },

    link: {
      color: 'inherit',
    },

    fillPath: {
      '& path, & circle': {
        fill: `url(#socialLinksGradient)`,
      },
    },

    row: {},
    column: {},
  }),
  { name: 'AkropolisSocialLinks' },
);

export { AkropolisSocialLinks };
