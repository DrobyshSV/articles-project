import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import styles from './Text.module.scss';

export enum ThemeText {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}
export enum AlignText {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum SizeText {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: ThemeText;
  align?: AlignText;
  size?: SizeText;
  'data-testId'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<SizeText, HeaderTagType> = {
  [SizeText.S]: 'h3',
  [SizeText.M]: 'h2',
  [SizeText.L]: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = ThemeText.PRIMARY,
    align = AlignText.LEFT,
    size = SizeText.M,
    'data-testId': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  const mods: Mods = {
    [styles[theme]]: true,
    [styles[align]]: true,
    [styles[size]]: true,
  };

  return (
    <div className={classNames(styles.Text, mods, [className])}>
      {title
          && (
            <HeaderTag
              className={styles.title}
              data-testId={`${dataTestId}.Header`}
            >
              {title}
            </HeaderTag>
          )}
      {text
          && (
            <p
              className={styles.text}
              data-testId={`${dataTestId}.Paragraph`}
            >
              {text}
            </p>
          )}
    </div>
  );
});
