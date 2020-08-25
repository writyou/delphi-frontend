import React, { useState, useCallback } from 'react';
import { makeStyles } from '@akropolis-web/styles';
import { ButtonBase, ButtonBaseProps, Grid, Typography } from '@akropolis-web/components';

import { GradientArrowButton } from 'components/GradientArrowButton/GradientArrowButton';

type Props = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  backgroundPath?: string;
};

export function ModuleIntroButton<C extends React.ElementType>(
  props: Props & ButtonBaseProps<C, { component?: C }>,
) {
  const classes = useStyles(props);

  const { title, subtitle, buttonLabel, backgroundPath, ...rest } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleButtonMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleButtonMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <ButtonBase
      {...rest}
      className={classes.root}
      focusVisibleClassName={classes.focusVisible}
      onMouseEnter={handleButtonMouseEnter}
      onMouseLeave={handleButtonMouseLeave}
      onFocus={handleButtonMouseEnter}
      onBlur={handleButtonMouseLeave}
    >
      <Grid container direction="column" className={classes.container}>
        <Grid item>
          <Typography>{title}</Typography>
        </Grid>
        <Grid item xs>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </Grid>
        <Grid item>
          <GradientArrowButton isHovered={isHovered} tabIndex={-1} component="div">
            {buttonLabel}
          </GradientArrowButton>
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
      alignItems: 'flex-start',
    },
    subtitle: {
      fontWeight: 300,
    },
    focusVisible: {},
  }),
  { name: 'ModuleIntroButton' },
);
