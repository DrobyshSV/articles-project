import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import styles from './NotFoundPage.module.scss';
import {memo} from 'react';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.NotFoundPage, {}, [className])}>
      {t('Not_Found')}
    </div>
  );
});
