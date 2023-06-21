import { memo, ReactNode, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

import styles from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, onTabClick, value, direction = 'row' } = props;

  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      className={classNames(styles.Tabs, {}, [className])}
      gap="8"
      align="start"
      direction={direction}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            variant={isSelected ? 'light' : 'normal'}
            className={classNames(styles.tab, {
              [styles.selected]: isSelected,
            })}
            key={tab.value}
            onClick={clickHandle(tab)}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
