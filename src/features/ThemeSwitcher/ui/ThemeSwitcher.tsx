import React, { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';
import DarkIcon from '@/shared/assets/icons/switcher-dark-theme-svg.svg';
import LightIcon from '@/shared/assets/icons/switcher-light-theme-svg.svg';
import { useAppDispatch } from '@/shared/config/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/config/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames('', {}, [className])}
      onClick={onToggleHandler}
    >
      {theme === Theme.DARK ? (
        <DarkIcon width="40px" height="40px" />
      ) : (
        <LightIcon width="40px" height="40px" />
      )}
    </Button>
  );
});
