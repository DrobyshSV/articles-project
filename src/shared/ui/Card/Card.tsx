import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';
import styles from './Card.module.scss';

export enum ThemeCard {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: ThemeCard;
}

export const Card = memo((props: CardProps) => {
  const {
    className, children, theme = ThemeCard.NORMAL, ...otherProps
  } = props;

  return (
    <div
      className={classNames(styles.Card, {}, [className, styles[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
