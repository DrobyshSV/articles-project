import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.scss';

export enum ThemeButton {
  CLEAR= 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  square?: boolean;
  size?: ButtonSize;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme,
    square,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [styles[theme]]: true,
    [styles.square]: square,
    [styles[size]]: true,
  };

  return (
    <button
      type="button"
      className={classNames(styles.Button, mods, [className, styles[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
