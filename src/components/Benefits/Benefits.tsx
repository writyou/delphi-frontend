import * as React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';

import { Card } from '../Card';
import { Preview } from '../Preview/Preview';
import { Section } from '../Section/Section';

export interface Benefit {
  title: React.ReactNode;
  description: string;
}

interface IProps {
  className?: string;
  benefits: Benefit[];
}

export function Benefits(props: IProps) {
  const { className, benefits } = props;
  const classes = useStyles();

  return (
    <Section className={className}>
      <div className={classes.container}>
        {benefits.map(({ title, description }, index) => (
          <div key={index} className={classes.item}>
            <Card className={cn(classes.card)} variant="contained">
              <Preview title={title} description={description} />
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}

const useStyles = makeStyles(
  theme => ({
    card: {
      height: '100%',

      padding: '30px 20px',
      [theme.breakpoints.up('tabletSM')]: {
        padding: theme.spacing(3.75, 5),
      },
      [theme.breakpoints.up('desktopMD')]: {
        padding: theme.spacing(3.75, 2.5),
      },

      '$item:nth-child(1) &': {
        background: theme.gradients.products[0].linear(),
      },
      '$item:nth-child(2) &': {
        background: theme.gradients.products[1].linear(),
      },
      '$item:nth-child(3) &': {
        background: theme.gradients.products[2].linear(),
      },
    },

    container: {
      display: 'flex',
      justifyContent: 'center',

      flexDirection: 'column',
      [theme.breakpoints.up('tabletXS')]: {
        flexDirection: 'row',
      },
    },

    item: {
      flexBasis: '100%',
      marginTop: theme.spacing(2.5),

      '&:first-of-type': {
        [theme.breakpoints.up('tabletXS')]: {
          marginLeft: 0,
        },
      },

      '&:last-of-type': {
        [theme.breakpoints.up('tabletXS')]: {
          marginRight: 0,
        },
      },

      [theme.breakpoints.up('tabletXS')]: {
        margin: [[0, 15]],
      },
      [theme.breakpoints.up('desktopXS')]: {
        margin: [[0, 20]],
      },
      [theme.breakpoints.up('desktopXL')]: {
        margin: [[0, 50]],
      },
    },
  }),
  { name: 'Benefits' },
);
