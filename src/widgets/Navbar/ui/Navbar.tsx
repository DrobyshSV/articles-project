import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { RouterPath } from '@/shared/config/routeConfig/routeConfig';
import { Text, ThemeText } from '@/shared/ui/Text/Text';
import { HStack } from '@/shared/ui/Stack';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string
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

  if (authData) {
    return (
      <header className={classNames(styles.Navbar, {}, [className])}>
        <Text
          className={styles.appName}
          title={t('DROBYSH PRODUCTION')}
          theme={ThemeText.INVERTED}
        />
        <AppLink
          to={RouterPath.article_create}
          theme={AppLinkTheme.SECONDARY}
          className={styles.createBtn}
        >
          {t('Create article')}
        </AppLink>
        <HStack gap="16" className={styles.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(styles.Navbar, {}, [className])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        className={styles.links}
        onClick={onOpenModal}
      >
        {t('Sign in')}
      </Button>
      <LoginModal
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </header>
  );
});
