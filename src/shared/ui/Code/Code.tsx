import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import CopyIcon from '../../assets/icons/copy-icon.svg';
import { Button, ThemeButton } from '../Button/Button';

import styles from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(styles.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={styles.copyBtn}
        theme={ThemeButton.CLEAR}
      >
        <CopyIcon className={styles.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
