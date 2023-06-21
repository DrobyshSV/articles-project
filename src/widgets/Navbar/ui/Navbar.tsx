import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import {
  AppLink as AppLinkDeprecated,
  AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated, ThemeText } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => styles.NavbarRedesigned,
    off: () => styles.Navbar,
  });

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <header className={classNames(mainClass, {}, [className])}>
            <HStack gap="16" className={styles.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(mainClass, {}, [className])}>
            <TextDeprecated
              className={styles.appName}
              title={t('DROBYSH PRODUCTION')}
              theme={ThemeText.INVERTED}
            />
            <AppLinkDeprecated
              to={getRouteArticleCreate()}
              theme={AppLinkTheme.SECONDARY}
              className={styles.createBtn}
            >
              {t('Create article')}
            </AppLinkDeprecated>
            <HStack gap="16" className={styles.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Button
            variant="clear"
            className={styles.links}
            onClick={onOpenModal}
          >
            {t('Sign in')}
          </Button>
        }
        off={
          <ButtonDeprecated
            theme={ThemeButton.CLEAR_INVERTED}
            className={styles.links}
            onClick={onOpenModal}
          >
            {t('Sign in')}
          </ButtonDeprecated>
        }
      />
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
