/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import cn from 'classnames';
import { O } from 'ts-toolbelt';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { makeStyles } from 'utils/styles';
import { useAdaptabilityContext } from 'services/adaptability/AdaptabilityContext';

import { Breakpoints } from '../../../types';
import { useFromToQuery, useBreakpointsMatch } from '../../../hooks';

interface IProps {
  from: Breakpoint | number;
  to: Breakpoint | number;
  className?: string;
  children: React.ReactNode;
}

function Adaptive(props: O.Optional<IProps, 'from'> | O.Optional<IProps, 'to'>) {
  const { from, to, className, children } = props;

  const query = useFromToQuery({ from, to } as
    | O.Optional<Breakpoints, 'from'>
    | O.Optional<Breakpoints, 'to'>);
  const matched = useBreakpointsMatch({ from, to } as
    | O.Optional<Breakpoints, 'from'>
    | O.Optional<Breakpoints, 'to'>);

  const { hydrated } = useAdaptabilityContext();

  const useStyles = React.useMemo(
    () =>
      makeStyles({
        root: {
          display: 'none',
          [query || '&']: {
            display: 'unset',
          },
        },
      }),
    [query],
  );
  const classes = useStyles();

  const isServer = window.__PRERENDER_INJECTED__ ? window.__PRERENDER_INJECTED__.isServer : false;

  const wrappedChildren = (
    <div className={cn(hydrated ? classes.root : undefined, className)}>{children}</div>
  );

  return isServer || !query || !hydrated || matched ? wrappedChildren : null;
}

export { IProps, Adaptive };
