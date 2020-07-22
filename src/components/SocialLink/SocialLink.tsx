import * as React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

import { getSocialIconByLink } from '../icons';

interface IProps {
  className?: string;
  href: string;
  FallbackIcon?: React.StatelessComponent<SvgIconProps>;
}

function SocialLink(props: IProps) {
  const { className, href, FallbackIcon } = props;
  const Icon = getSocialIconByLink(href, FallbackIcon);
  return (
    <IconButton href={href} className={className} target="_target" rel="noopener noreferrer">
      <Icon fontSize="inherit" />
    </IconButton>
  );
}

export { SocialLink };
