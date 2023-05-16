import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Icon.module.scss';

interface IconProps extends React.SVGAttributes<SVGElement>{
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
  const {
    className, Svg, inverted, ...otherProps
  } = props;

  return (
    <Svg
      className={classNames(inverted ? styles.inverted : styles.Icon, {}, [className])}
      {...otherProps}
    />
  );
});
