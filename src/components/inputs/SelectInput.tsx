import React, { ComponentPropsWithoutRef, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import { MenuProps } from '@material-ui/core/Menu';

import { makeStyles } from 'utils/styles';
import { AngleArrow } from 'components/icons';

import { TextInput } from './TextInput';

type Option = {
  id: string;
  label: string | JSX.Element;
};

type OwnProps = {
  options: Option[];
};

type SelectInputProps = OwnProps & ComponentPropsWithoutRef<typeof TextInput>;

export function SelectInput(props: SelectInputProps) {
  const { options, InputProps = {}, ...restProps } = props;
  const { className: inputClassName, ...restInputProps } = InputProps;
  const classes = useStyles();

  const [isMenuOpen, setIsOpen] = useState(false);

  const handleSelectOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleSelectClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const menuPositionProps = useMemo<Partial<MenuProps>>(
    () => ({
      elevation: 0,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      getContentAnchorEl: null,
    }),
    [],
  );

  return (
    <TextInput
      {...restProps}
      select
      variant="outlined"
      className={classes.root}
      InputProps={{
        ...restInputProps,
        className: cn(inputClassName, {
          [classes.isOpen]: isMenuOpen,
        }),
      }}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            variant: 'outlined',
            className: classes.paper,
          },
          ...menuPositionProps,
        },
        IconComponent: renderArrowIcon,
        onOpen: handleSelectOpen,
        onClose: handleSelectClose,
      }}
    >
      {options.map(({ id, label }) => {
        return (
          <MenuItem key={id} value={id}>
            {label}
          </MenuItem>
        );
      })}
    </TextInput>
  );

  function renderArrowIcon() {
    return (
      <div className={classes.arrowIcon}>
        <AngleArrow fontSize="inherit" />
      </div>
    );
  }
}

const useStyles = makeStyles(
  theme => ({
    root: {
      minWidth: 129,
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '0 0 8px 8px',
      borderColor: theme.colors.darkMist,
      borderTop: 'none',
    },
    isOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,

      '& $arrowIcon': {
        transform: 'rotate(-90deg)',
      },
    },
    arrowIcon: {
      position: 'absolute',
      right: 0,
      padding: 8,
      fontSize: 18,
      transform: 'rotate(90deg)',
      pointerEvents: 'none',
      transition: '1s',
    },
  }),
  { name: 'SelectInput' },
);
