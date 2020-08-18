import * as React from 'react';
import { useHistory } from 'react-router';

import { Hint, Button } from 'components';
import { routes } from 'app/routes';

type Props = {
  redirectPage: 'savings' | 'investments' | 'dca' | 'staking' | 'harvest';
};

export function EmptyListHint(props: Props) {
  const { redirectPage } = props;
  const history = useHistory();

  function handleButtonOnClick() {
    if (redirectPage !== 'harvest') history.push(routes[redirectPage].getRedirectPath());
  }

  function renderButton() {
    return (
      <Button size="small" variant="contained" color="primary" onClick={handleButtonOnClick}>
        Explore
      </Button>
    );
  }

  return redirectPage === 'harvest' ? (
    <Hint>You have not farmed anything yet</Hint>
  ) : (
    <Hint button={renderButton()}>
      {`You did not supply liquidity to any ${redirectPage} pools yet`}
    </Hint>
  );
}
