import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { routes } from 'app/routes';
import { Tabs, ComingSoon } from 'components';
import { makeStyles } from 'utils/styles';

import { DepositTab } from './innerPages/DepositTab';
import { WithdrawTab } from './innerPages/WithdrawTab';

const tabs = [
  {
    label: 'Deposit',
    value: routes.dca.deposit.getElementKey(),
    to: routes.dca.deposit.getRedirectPath(),
    renderContent: () => <DepositTab />,
  },
  {
    label: 'Withdraw',
    value: routes.dca.withdraw.getElementKey(),
    to: routes.dca.withdraw.getRedirectPath(),
    renderContent: () => <WithdrawTab />,
  },
];

export function DCAPage() {
  const defaultPage = routes.dca.deposit.getElementKey();
  const match = useRouteMatch<{ page: string }>('/dca/:page');
  const page = match ? match.params.page : defaultPage;
  const classes = useStyles();

  const [selectedPage, setSelectedPage] = React.useState(defaultPage);

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: string) => {
    setSelectedPage(tab);
  };

  return (
    <Tabs currentValue={selectedPage} tabs={tabs} onChange={handleTabChange}>
      <div className={classes.comingSoon}>
        <ComingSoon variant="label" />
      </div>
    </Tabs>
  );
}

const useStyles = makeStyles(
  () => ({
    comingSoon: {
      flexGrow: 1,
      alignSelf: 'center',
      display: 'flex',
      marginLeft: 10,
    },
  }),
  { name: 'DCAPage' },
);
