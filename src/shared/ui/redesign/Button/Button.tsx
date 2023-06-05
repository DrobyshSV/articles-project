import { ButtonHTMLAttributes, ForwardedRef, memo, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import styles from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
  color?: ButtonColor;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button = memo(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      className,
      children,
      variant = 'outline',
      square,
      disabled,
      size = 'm',
      fullWidth,
      addonLeft,
      addonRight,
      color = 'normal',
      ...otherProps
    } = props;

    const mods: Mods = {
      [styles.square]: square,
      [styles.disabled]: disabled,
      [styles.fullWidth]: fullWidth,
      [styles.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
      <button
        type="button"
        className={classNames(styles.Button, mods, [
          className,
          styles[variant],
          styles[size],
          styles[color],
        ])}
        disabled={disabled}
        {...otherProps}
        ref={ref}
      >
        <div className={styles.addonLeft}>{addonLeft}</div>
        {children}
        <div className={styles.addonRight}>{addonRight}</div>
      </button>
    );
  },
);
