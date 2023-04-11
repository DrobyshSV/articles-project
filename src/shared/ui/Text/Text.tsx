import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import styles from './Text.module.scss';

export enum ThemeText {
  PRIMARY = 'primary',
  ERROR = 'error',
}
export enum AlignText {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: ThemeText;
  align?: AlignText;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = ThemeText.PRIMARY,
    align = AlignText.LEFT,
  } = props;

  const mods: Mods = {
    [styles[theme]]: true,
    [styles[align]]: true,
  };

  return (
    <div className={classNames(styles.Text, mods, [className])}>
      {title && <p className={styles.title}>{title}</p>}
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
});
