import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = ({
  className, src, size, alt,
}: AvatarProps) => {
  const mods: Mods = {};

  const cssStyles = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100,
  }), [size]);

  return (
    <img
      src={src}
      alt={alt}
      style={cssStyles}
      className={classNames(styles.Avatar, mods, [className])}
    />
  );
};
