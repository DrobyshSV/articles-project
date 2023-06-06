import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesign/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en').then((r) => r);
  };
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Button onClick={toggleLang} variant="clear">
          {t(short ? 'lang' : 'language')}
        </Button>
      }
      off={
        <ButtonDeprecated
          className={classNames('', {}, [className])}
          theme={ThemeButton.CLEAR}
          onClick={toggleLang}
        >
          {t(short ? 'lang' : 'language')}
        </ButtonDeprecated>
      }
    />
  );
});
