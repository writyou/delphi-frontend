import React from 'react';
import { Link } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import TabsList from '@material-ui/lab/TabList';

import { useInheritBackgroundHackStyles } from 'utils/styles';

import { useStyles } from './Tabs.style';

type TabContent = {
  value: string;
  label: React.ReactNode;
  renderContent: () => React.ReactNode;
};

type TabItem<T extends React.ElementType> = Partial<
  Omit<React.ComponentProps<T>, keyof TabContent>
> &
  TabContent;

type Props<T extends React.ElementType> = {
  currentValue: string;
  tabs: TabItem<T>[];
  onChange: (_: React.ChangeEvent<{}>, tab: string) => void;
  component?: T;
  children?: React.ReactNode;
};

export function Tabs<T extends React.ElementType = typeof Link>(props: Props<T>) {
  const { tabs, currentValue, children, onChange, component = Link } = props;

  const backgroundColor = useInheritBackgroundHackStyles();
  const classes = useStyles({ backgroundColor });

  return (
    <TabContext value={currentValue}>
      <div className={classes.navigationBar}>
        <TabsList
          value={currentValue}
          classes={{
            root: classes.tabs,
            indicator: classes.indicator,
            scroller: classes.scroller,
            flexContainer: classes.flexContainer,
          }}
          onChange={onChange}
        >
          {tabs.map(tabItem => renderTab(tabItem))}
          {children}
        </TabsList>
      </div>
      {tabs.map(({ value, renderContent }) => (
        <TabPanel value={value} key={value} classes={{ root: classes.tabPanel }}>
          {renderContent()}
        </TabPanel>
      ))}
    </TabContext>
  );

  function renderTab(tabItem: TabItem<T>) {
    const { value, label, renderContent, ...restTabProps } = tabItem;
    return (
      <Tab
        {...restTabProps}
        label={label}
        classes={{ root: classes.tab, selected: classes.selected }}
        value={value}
        key={value}
        component={component}
      />
    );
  }
}
