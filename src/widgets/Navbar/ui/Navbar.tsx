import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RouterPath } from 'shared/config/routeConfig/routeConfig';
import { ThemeText, Text } from 'shared/ui/Text/Text';
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);
  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);
  if (authData) {
    return (
      <div className={classNames(styles.Navbar, {}, [className])}>
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
        <Button
          theme={ThemeButton.CLEAR_INVERTED}
          className={styles.links}
          onClick={onLogout}
        >
          {t('Logout')}
        </Button>
      </div>
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
