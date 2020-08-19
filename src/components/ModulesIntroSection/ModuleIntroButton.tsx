import React from 'react';
import { makeStyles } from '@akropolis-web/styles';

type Props = {
  title: string;
  subtitle: string;
  button: JSX.Element;
  backgroundPath?: string;
};

export function PoolIntroCard(props: Props) {
  const classes = useStyles(props);

  const { title, subtitle, button } = props;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.title}>{title}</div>
        <div className={classes.subtitle}>{subtitle}</div>
        <div className={classes.button}>{button}</div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      minHeight: 144,
      height: '100%',
      padding: 20,
      borderRadius: 6,
      background: '#212131 no-repeat right bottom 0% / contain',
      backgroundImage: ({ backgroundPath }: Props) => `url(${backgroundPath})`,
      overflow: 'hidden',
    },
    content: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      marginBottom: 5,
    },
    subtitle: {
      flexGrow: 1,
      fontWeight: 300,
      marginBottom: 5,
    },
    button: {},
  }),
  { name: 'PoolIntroCard' },
);
