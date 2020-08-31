import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  () => ({
    root: {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    chart: {
      width: '100%',
      height: '200%',
    },
    title: {
      maxWidth: '50%',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    },
  }),
  { name: 'ProgressChart' },
);
