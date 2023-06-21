import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleList } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo(
  ({ className }: ArticleInfiniteListProps) => {
    const { t } = useTranslation();

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);

    if (error) {
      return (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text text={t('Article load error')} />}
          off={<TextDeprecated text={t('Article load error')} />}
        />
      );
    }

    return (
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
        className={className}
      />
    );
  },
);
