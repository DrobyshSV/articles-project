import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import DarkIcon from '@/shared/assets/icons/switcher-dark-theme-svg.svg';
import LightIcon from '@/shared/assets/icons/switcher-light-theme-svg.svg';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { useTheme } from '@/shared/config/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames('', {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK
        ? <DarkIcon width="40px" height="40px" />
        : <LightIcon width="40px" height="40px" />}
    </Button>
  );
});
