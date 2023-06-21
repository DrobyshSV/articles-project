import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const { className, content, left, right } = props;

  return (
    <div className={classNames(styles.StickyLayout, {}, [className])}>
      {left && <div className={styles.left}>{left}</div>}
      <div className={styles.content}>{content}</div>
      {right && <div className={styles.right}>{right}</div>}
    </div>
  );
});
