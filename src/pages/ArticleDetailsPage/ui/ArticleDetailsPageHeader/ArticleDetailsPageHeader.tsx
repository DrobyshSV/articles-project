import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from 'shared/config/routeConfig/routeConfig';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { getCanEditArticle } from '../../model/selectors/article';
import styles from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const onBackToList = useCallback(() => {
    navigate(RouterPath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RouterPath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <div className={classNames(styles.ArticleDetailsPageHeader, {}, [className])}>
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t('Back to list')}
      </Button>
      {canEdit && (
        <Button
          className={styles.editBtn}
          theme={ThemeButton.OUTLINE}
          onClick={onEditArticle}
        >
          {t('Edit')}
        </Button>
      )}
    </div>
  );
});
