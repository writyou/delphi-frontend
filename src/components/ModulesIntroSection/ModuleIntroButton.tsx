import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@akropolis-web/styles';
import { ButtonBase, ButtonBaseProps, Grid, Typography, Box } from '@akropolis-web/components';

import { GradientArrowButton } from 'components/GradientArrowButton/GradientArrowButton';

type Props = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  backgroundPath?: string;
};

export function ModuleIntroButton(props: Props & ButtonBaseProps<typeof RouterLink>) {
  const classes = useStyles(props);

  const { title, subtitle, buttonLabel, to } = props;

  return (
    <ButtonBase
      className={classes.root}
      component={RouterLink}
      to={to}
      focusVisibleClassName={classes.focusVisible}
    >
      <Grid container direction="column" className={classes.container}>
        <Grid item>
          <Typography>{title}</Typography>
        </Grid>
        <Box clone flexGrow={1}>
          <Grid item>
            <Typography className={classes.subtitle}>{subtitle}</Typography>
          </Grid>
        </Box>
        <Grid item>
          <GradientArrowButton tabIndex={-1}>{buttonLabel}</GradientArrowButton>
        </Grid>
      </Grid>
    </ButtonBase>
  );
}

const useStyles = makeStyles(
  theme => ({
    root: {
      width: '100%',
      maxWidth: 400,
      minHeight: 144,
      padding: 20,
      borderRadius: 6,
      background: '#212131 no-repeat right bottom 0% / contain',
      backgroundImage: ({ backgroundPath }: Props) => `url(${backgroundPath})`,
      transition: theme.transitions.create(['background-color']),
      overflow: 'hidden',

      '&:hover, &$focusVisible': {
        backgroundColor: '#30304C',
      },
    },
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    subtitle: {
      fontWeight: 300,
    },
    focusVisible: {},
  }),
  { name: 'ModuleIntroButton' },
);
