import React from 'react';

import { NewHeader } from '../NewHeader';
import { useStyles } from './MainLayout.style';
import { AppFooter } from '../AppFooter/AppFooter';

export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.headerAndContent}>
        <div className={classes.header}>
          <NewHeader />
        </div>
        <div className={classes.content}>{children}</div>
        <div className={classes.footer}>
          <AppFooter />
        </div>
      </div>
    </div>
  );
};
