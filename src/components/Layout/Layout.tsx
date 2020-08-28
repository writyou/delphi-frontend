import React from 'react';
import cn from 'classnames';

import { attachStaticFields } from 'utils/object';
import { Adaptive } from 'services/adaptability';

import { AkropolisSocialLinks } from '../AkropolisSocialLinks/AkropolisSocialLinks';
import { useStyles } from './Layout.style';

type Props = {
  children: React.ReactNode;
};

function LayoutComponent({ children }: Props) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

function Socials({ className }: ContainerProps) {
  const classes = useStyles();
  return (
    <div className={cn(className, classes.socials)}>
      <Adaptive to="tabletXS">
        <AkropolisSocialLinks direction="row" />
      </Adaptive>
      <Adaptive from="tabletXS">
        <AkropolisSocialLinks direction="column" />
      </Adaptive>
    </div>
  );
}

function Header({ children, className }: ContainerProps) {
  const classes = useStyles();
  return <div className={cn(className, classes.container, classes.header)}>{children}</div>;
}

function Container({ children, className }: ContainerProps) {
  const classes = useStyles();
  return <div className={cn(className, classes.container)}>{children}</div>;
}

function Footer({ children, className }: ContainerProps) {
  const classes = useStyles();
  return <div className={cn(className, classes.container, classes.footer)}>{children}</div>;
}

export const Layout = attachStaticFields(LayoutComponent, {
  Header,
  Container,
  Footer,
  Socials,
});
