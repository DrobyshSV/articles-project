import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField, ArticleType } from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

import styles from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    onChangeType,
    onChangeSearch,
    search,
    onChangeSort,
    sort,
    onChangeOrder,
    order,
    type,
  } = props;
  const { t } = useTranslation();

  return (
    <Card
      className={classNames(styles.ArticlesFilters, {}, [className])}
      padding="24"
    >
      <VStack gap="32">
        <Input
          onChange={onChangeSearch}
          value={search}
          size="s"
          placeholder={t('Search')}
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={styles.tabs}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
