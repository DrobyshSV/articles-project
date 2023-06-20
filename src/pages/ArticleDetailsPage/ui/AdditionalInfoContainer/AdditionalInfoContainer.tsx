import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

import styles from './AdditionalInfoContainer.module.scss';

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);

  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  if (!article) {
    return (
      <Card border="partial" className={styles.card}>
        <Skeleton width="100%" height={200} />;
      </Card>
    );
  }

  return (
    <Card padding="24" border="partial" className={styles.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
});
