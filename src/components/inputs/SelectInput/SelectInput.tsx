import React, { ComponentPropsWithoutRef, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import { MenuProps } from '@material-ui/core/Menu';

import { AngleArrow } from 'components/icons';

import { TextInput } from '../TextInput';
import { useStyles } from './SelectInput.style';

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
      className={cn(
        classes.root,
        {
          [classes.isOpen]: isMenuOpen,
        },
        {
          [classes.withSingleOption]: options.length <= 1,
        },
      )}
      InputProps={{
        ...restInputProps,
        className: cn(inputClassName, classes.input),
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
