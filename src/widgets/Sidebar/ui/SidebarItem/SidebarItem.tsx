import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  AppLink as AppLinkDeprecated,
  AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesign/AppLink';
import { Icon } from '@/shared/ui/redesign/Icon';

import { SidebarItemType } from '../../model/types/sidebar';

import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <AppLink
          to={item.path}
          className={classNames(styles.itemRedesigned, {
            [styles.collapsedRedesigned]: collapsed,
          })}
          activeClassName={styles.active}
        >
          <Icon Svg={item.Icon} />
          <span className={styles.link}>{t(item.text)}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
          className={classNames(styles.item, { [styles.collapsed]: collapsed })}
        >
          <item.Icon className={styles.icon} />
          <span className={styles.link}>{t(item.text)}</span>
        </AppLinkDeprecated>
      }
    />
  );
});
