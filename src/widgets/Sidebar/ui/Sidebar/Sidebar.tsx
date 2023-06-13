import React, { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIconSidebar from '@/shared/assets/icons/arrow-bottom-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/deprecated/Button';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import styles from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const collapsedHandler = () => {
    setCollapsed(!collapsed);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <aside
          data-testid="sidebar"
          className={classNames(
            styles.SidebarRedesigned,
            { [styles.collapsedRedesigned]: collapsed },
            [className],
          )}
        >
          <AppLogo className={styles.appLogo} size={collapsed ? 30 : 50} />
          <VStack role="navigation" gap="8" className={styles.items}>
            {itemsList}
          </VStack>
          <Icon
            data-testid="sidebar-toggle"
            className={styles.collapseBtn}
            onClick={collapsedHandler}
            Svg={ArrowIconSidebar}
            clickable
          />
          <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={styles.lang} />
          </div>
        </aside>
      }
      off={
        <aside
          data-testid="sidebar"
          className={classNames(
            styles.Sidebar,
            { [styles.collapsed]: collapsed },
            [className],
          )}
        >
          <Button
            data-testid="sidebar-toggle"
            onClick={collapsedHandler}
            className={styles.collapseBtn}
            theme={ThemeButton.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role="navigation" gap="8" className={styles.items}>
            {itemsList}
          </VStack>
          <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={styles.lang} short={collapsed} />
          </div>
        </aside>
      }
    />
  );
});
