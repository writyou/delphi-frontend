import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Label,
  PoolSummaryCard,
  GradientArrowButton,
  FormattedAmount,
  CatsPawPlaceholder,
} from 'components';
import { routes } from 'app/routes';
import { percentAmount } from 'utils/mock';

export function UserInvestmentPoolsSummary() {
  return (
    <PoolSummaryCard
      title={<Label withComingSoon>Investments</Label>}
      chart={<CatsPawPlaceholder variant="violet" size="extra-small" />}
      apyValue={<FormattedAmount sum={percentAmount} />}
      button={
        <GradientArrowButton component={RouterLink} to={routes.investments.getRedirectPath()}>
          Invest
        </GradientArrowButton>
      }
    />
  );
}
