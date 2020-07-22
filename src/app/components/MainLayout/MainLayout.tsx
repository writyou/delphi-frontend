import React from 'react';

import { NewHeader } from '../NewHeader';
import { useStyles } from './MainLayout.style';
import { AppFooter } from '../AppFooter/AppFooter';

type Props = {
  Content: React.FC;
};

export const MainLayout: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.headerAndContent}>
        <div className={classes.header}>
          <NewHeader />
        </div>
        <div className={classes.content}>
          <props.Content />
        </div>
        <div className={classes.footer}>
          <AppFooter />
        </div>
      </div>
    </div>
  );
};
