import * as React from 'react';

import { Amount } from 'model/entities';
import { makeStyles } from 'utils/styles';

import { PieChartData, PieSector } from '../CompositionChart/model';
import { usePieSectors } from '../CompositionChart/usePieSectors';

type Props<T extends Amount, P = void> = {
  chartData: PieChartData<T, P>[];
  Template: React.FC<{
    sectors: PieSector<T, P>[];
    renderLabel?(sector: PieSector<T, P>): React.ReactNode;
  }>;
  renderLabel?(sector: PieSector<T, P>): React.ReactNode;
};

export function CompositionLegend<T extends Amount, P = void>({
  chartData,
  Template,
  renderLabel,
}: Props<T, P>) {
  const classes = useStyles();

  const sectors = usePieSectors(chartData);

  return (
    <div className={classes.root}>
      <Template sectors={sectors} renderLabel={renderLabel} />
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {},
}));
