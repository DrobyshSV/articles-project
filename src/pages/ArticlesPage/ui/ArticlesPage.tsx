import { ArticleList, ArticleView } from 'entities/Article';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './ArticlePage.module.scss';

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.ArticlesPage, {}, [className])}>
      <ArticleList
        isLoading
        view={ArticleView.LIST}
        articles={[]}
      />
    </div>
  );
});

export default memo(ArticlesPage);
