import React, { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';
import ThemeIcon from '@/shared/assets/icons/palette-color-icon.svg';
import ThemeIconDeprecated from '@/shared/assets/icons/switcher-light-theme-svg.svg';
import { useAppDispatch } from '@/shared/config/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/config/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesign/Icon';

const t = ThemeIconDeprecated;
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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
      off={
        <ButtonDeprecated
          theme={ThemeButton.CLEAR}
          className={classNames('', {}, [className])}
          onClick={onToggleHandler}
        >
          <IconDeprecated Svg={ThemeIcon} width={60} height={40} inverted />
        </ButtonDeprecated>
      }
    />
  );
});
