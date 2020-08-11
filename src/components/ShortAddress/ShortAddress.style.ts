import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(() => {
  return {
    root: {
      width: 'min-content',
    },
    shortAddress: {
      fontSize: 'inherit',
      color: 'inherit',
    },
    tooltip: {
      cursor: 'pointer',
      borderBottom: '1px dashed',
    },
    icon: {
      width: 'auto',
      height: 'auto',
      fontSize: 'inherit',
      marginRight: 10,
    },
  };
});
