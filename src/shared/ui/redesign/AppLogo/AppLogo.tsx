import React, { memo } from 'react';

import AppLogoSvg from '@/shared/assets/icons/app-logo.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';

import styles from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo(({ className }: AppLogoProps) => (
  <HStack
    max
    justify="center"
    className={classNames(styles.appLogoWrapper, {}, [className])}
  >
    <div className={styles.gradientBig} />
    <div className={styles.gradientSmall} />
    <AppLogoSvg className={styles.appLogo} />
  </HStack>
));
