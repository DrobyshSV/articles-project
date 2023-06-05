import React, { memo } from 'react';

import AppLogoSvg from '@/shared/assets/icons/app-logo.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';

import styles from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => (
  <HStack
    max
    justify="center"
    className={classNames(styles.appLogoWrapper, {}, [className])}
  >
    <AppLogoSvg
      width={size}
      height={size}
      color="black"
      className={styles.appLogo}
    />
    <div className={styles.gradientBig} />
    <div className={styles.gradientSmall} />
  </HStack>
));
