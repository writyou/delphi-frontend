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

export function UserDCAPoolsSummary() {
  return (
    <PoolSummaryCard
      title={<Label withComingSoon>DCA</Label>}
      chart={<CatsPawPlaceholder variant="turquoise" size="extra-small" />}
      apyValue={<FormattedAmount sum={percentAmount} />}
      button={
        <GradientArrowButton component={RouterLink} to={routes.dca.getRedirectPath()}>
          DCA
        </GradientArrowButton>
      }
    />
  );
}
