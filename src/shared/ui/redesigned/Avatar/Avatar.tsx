import { CSSProperties, useMemo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import UserIcon from '../../../assets/icons/avatar-icon.svg';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = ({ className, src, size = 100, alt }: AvatarProps) => {
  const mods: Mods = {};

  const cssStyles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={cssStyles}
      className={classNames(styles.Avatar, mods, [className])}
    />
  );
};
