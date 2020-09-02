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
import { useBreakpointsMatch } from 'services/adaptability';

export function UserDCAPoolsSummary() {
  const isMobile = useBreakpointsMatch({ to: 'tabletXS' });

  return (
    <PoolSummaryCard
      title={<Label withComingSoon>DCA</Label>}
      chart={
        <CatsPawPlaceholder variant="turquoise" size={isMobile ? 'ultra-small' : 'extra-small'} />
      }
      apyValue={<FormattedAmount sum={percentAmount} />}
      button={
        <GradientArrowButton component={RouterLink} to={routes.dca.getRedirectPath()}>
          DCA
        </GradientArrowButton>
      }
    />
  );
}
