import { makeStyles, colors } from 'utils/styles';

export const useStyles = makeStyles(() => ({
  tab: {
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
  },

  additionalTab: {
    marginLeft: 'auto',
  },

  tabsFlexContainer: {
    borderBottom: `2px solid ${colors.athensGray}`,
  },
}));
