import React from 'react';

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
        <GradientArrowButton to={routes.investments.getRedirectPath()} id="invest">
          Invest
        </GradientArrowButton>
      }
    />
  );
}
