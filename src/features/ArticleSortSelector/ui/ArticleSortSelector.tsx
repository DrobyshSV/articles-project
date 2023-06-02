import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';

import { ArticleSortField } from '../../../entities/Article/model/consts/consts';

import styles from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('increase'),
      },
      {
        value: 'desc',
        content: t('decrease'),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('created'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('title'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('views'),
      },
    ],
    [t],
  );

  const changeSortHandler = useCallback(
    (newSort: string) => {
      onChangeSort(newSort as ArticleSortField);
    },
    [onChangeSort],
  );

  const changeOrderHandler = useCallback(
    (newOrder: string) => {
      onChangeOrder(newOrder as SortOrder);
    },
    [onChangeOrder],
  );

  return (
    <div className={classNames(styles.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        options={sortFieldOptions}
        label={t('Sort BY')}
        value={sort}
        onChange={onChangeSort}
      />
      <Select<SortOrder>
        options={orderOptions}
        label={t('BY')}
        value={order}
        onChange={onChangeOrder}
        className={styles.order}
      />
    </div>
  );
});
