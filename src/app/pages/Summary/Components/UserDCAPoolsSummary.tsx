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

export function UserDCAPoolsSummary() {
  return (
    <PoolSummaryCard
      title={<Label withComingSoon>DCA</Label>}
      chart={<CatsPawPlaceholder variant="turquoise" size="extra-small" />}
      apyValue={<FormattedAmount sum={percentAmount} />}
      button={
        <GradientArrowButton to={routes.dca.getRedirectPath()} id="dca">
          DCA
        </GradientArrowButton>
      }
    />
  );
}
