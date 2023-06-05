import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import CopyIconNew from '../../../assets/icons/copy-icon-new.svg';
import CopyIcon from '../../../assets/icons/copy-icon.svg';
import { Button, ThemeButton } from '../../deprecated/Button/Button';
import { Icon } from '../Icon';

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <pre className={classNames(styles.CodeRedesigned, {}, [className])}>
          <Icon
            clickable
            onClick={onCopy}
            className={styles.copyBtn}
            Svg={CopyIconNew}
          />
          <code>{text}</code>
        </pre>
      }
      off={
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
      }
    />
  );
});
