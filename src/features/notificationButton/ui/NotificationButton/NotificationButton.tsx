import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-icon-deprecated.svg';
import NotificationIcon from '@/shared/assets/icons/notification-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/redesign/Drawer';
import { Icon } from '@/shared/ui/redesign/Icon';
import { Popover } from '@/shared/ui/redesign/Popups';

import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo(
  ({ className }: NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
      setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
      setIsOpen(false);
    }, []);

    const trigger = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
        off={
          <ButtonDeprecated onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
            <IconDeprecated Svg={NotificationIconDeprecated} inverted />
          </ButtonDeprecated>
        }
      />
    );

    return (
      <div>
        <BrowserView>
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <Popover
                className={classNames(styles.NotificationButton, {}, [
                  className,
                ])}
                direction="bottom left"
                trigger={trigger}
              >
                <NotificationList className={styles.notifications} />
              </Popover>
            }
            off={
              <PopoverDeprecated
                className={classNames(styles.NotificationButton, {}, [
                  className,
                ])}
                direction="bottom left"
                trigger={trigger}
              >
                <NotificationList className={styles.notifications} />
              </PopoverDeprecated>
            }
          />
        </BrowserView>
        <MobileView>
          {trigger}
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        </MobileView>
      </div>
    );
  },
);
