import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Card.module.scss';

export enum ThemeCard {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: ThemeCard;
  max?: boolean;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    theme = ThemeCard.NORMAL,
    max,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(styles.Card, { [styles.max]: max }, [className, styles[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
