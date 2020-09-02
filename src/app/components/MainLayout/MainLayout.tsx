import React from 'react';

import { Card } from 'components';

// import { NewHeader } from '../NewHeader';
import { PreauditVersionWarning } from '../PreauditVersionWarning/PreauditVersionWarning';
import { useStyles } from './MainLayout.style';
import { AppFooter } from '../AppFooter/AppFooter';
// import { Sidebar } from '../Sidebar';

export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Sidebar /> */}
      <div className={classes.headerAndContent}>
        {/* <Card variant="contained" className={classes.header}>
          <NewHeader />
  </Card> */}
        <div className={classes.preauditVersionWarning}>
          <PreauditVersionWarning />
        </div>
        <div className={classes.content}>{children}</div>
        <Card variant="contained" className={classes.footer}>
          <AppFooter />
        </Card>
      </div>
    </div>
  );
};
