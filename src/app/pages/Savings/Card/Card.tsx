import React from 'react';

import { Link } from 'components';

import { useStyles } from './Card.style';

type Props = {
  value: number;
  footerElement?: JSX.Element;
};

export function Card({ value, footerElement }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.cardName}>Compund</div>
        <div className={classes.tokens}>
          <div className={classes.token} />
          <div className={classes.token} />
          <div className={classes.token} />
        </div>
      </div>
      <div className={classes.row}>
        <span>My Supply Balance</span>
        <span className={classes.value}>{value}</span>
      </div>
      <div className={classes.row}>
        <span>Pool Liquidity</span>
        <span className={classes.value}>{12}</span>
      </div>
      {footerElement}
    </div>
  );
}

type ViewProps = {
  getLink: () => string;
  allocateSwitcher: JSX.Element;
  element?: JSX.Element;
};

export function WithViewDetails({ getLink, allocateSwitcher, element }: ViewProps) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.row}>
        {allocateSwitcher}
        <Link href={getLink()} />
      </div>
      {element}
    </>
  );
}
