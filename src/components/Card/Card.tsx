import React from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';

import { makeStyles, rgba } from 'utils/styles';

interface CardProps {
  className?: string;
  variant?: 'outlined' | 'contained';
  label?: string;
  children: React.ReactNode;
  icons?: React.ReactNode[];
}

export function Card(props: CardProps) {
  const { label, variant = 'outlined', children, icons, className } = props;
  const classes = useStyles();
  return (
    <div
      className={cn(className, classes.root, {
        [classes.outlined]: variant === 'outlined',
        [classes.contained]: variant === 'contained',
      })}
    >
      {children}
      {label && (
        <Typography component="div" className={classes.label}>
          <span>{label}</span>
        </Typography>
      )}
      {icons && (
        <div className={classes.icons}>
          {icons.map((icon, index) => (
            <div className={classes.icon} key={index}>
              {icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: theme.spacing(0.5),
    transition: theme.transitions.create(['border-color', 'background-color']),

    '&$outlined': {
      border: `1px solid ${rgba(
        theme.palette.type === 'light' ? theme.colors.shark : theme.colors.white,
        theme.palette.type === 'light' ? 0.2 : 0.25,
      )}`,
      WebkitBackgroundClip: 'padding-box',
      backgroundClip: 'padding-box',
    },
    '&$contained': {
      backgroundColor:
        theme.palette.type === 'light' ? theme.colors.zumthor : theme.colors.scarpaFlow,
    },
  },

  label: {
    position: 'absolute',
    top: 0,
    left: theme.spacing(2),
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing(2.5),
    borderRadius: theme.spacing(1.25),
    color: theme.colors.white,
    background: theme.gradients.main.linear('to right'),

    padding: theme.spacing(0.125, 0.75, 0.375),
    fontSize: theme.spacing(1.25),
    [theme.breakpoints.up('tabletXS')]: {
      padding: theme.spacing(0.25, 1.25),
      fontSize: theme.spacing(1.5),
    },
  },

  icons: {
    position: 'absolute',
    top: 0,
    right: theme.spacing(1.5),
    transform: 'translateY(-50%)',
    display: 'flex',
    fontSize: theme.spacing(3.75),
  },

  icon: {
    display: 'flex',
    marginRight: theme.spacing(1.5),

    '&:last-child': {
      marginRight: 0,
    },
  },
  outlined: {},
  contained: {},
}));
