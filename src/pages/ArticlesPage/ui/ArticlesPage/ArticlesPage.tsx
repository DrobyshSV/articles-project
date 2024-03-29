import React, { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { useAppDispatch } from '@/shared/config/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/config/hooks/useInitialEffect/useInitialEffect';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Page } from '@/widgets/Page';

import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';

import styles from './ArticlePage.module.scss';

interface ArticlesPageProps {
  className?: string;
}
const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <StickyContentLayout
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
          content={
            <Page
              data-testid="ArticlesPage"
              onScrollEnd={onLoadNextPart}
              className={classNames(styles.ArticlesPageRedesigned, {}, [
                className,
              ])}
            >
              <ArticleInfiniteList className={styles.list} />
              <ArticlePageGreeting />
            </Page>
          }
        />
      }
      off={
        <Page
          data-testid="ArticlesPage"
          onScrollEnd={onLoadNextPart}
          className={classNames(styles.ArticlesPage, {}, [className])}
        >
          <ArticlesPageFilters />
          <ArticleInfiniteList className={styles.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  );
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
});

export default memo(ArticlesPage);
