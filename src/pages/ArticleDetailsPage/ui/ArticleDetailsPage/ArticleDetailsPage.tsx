import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { SizeText, Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { useInitialEffect } from 'shared/config/hooks/useInitialEffect/useInitialEffect';
import { AddCommentForm } from 'features/addCommentForm';
import { RouterPath } from 'shared/config/routeConfig/routeConfig';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Page } from 'widgets/Page/Page';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import {
  fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { getArticleRecommendations } from '../../model/slice/articleDetailsPageRecommendationsSlice';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import styles from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slice';

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
  const navigate = useNavigate();

  const onBackToList = useCallback(() => {
    navigate(RouterPath.articles);
  }, [navigate]);

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });

  if (!id) {
    return (
      <Page className={classNames(styles.ArticleDetailsPage, {}, [className])}>
        {t('Article not found')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(styles.ArticleDetailsPage, {}, [className])}>
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t('Back to list')}
        </Button>
        <ArticleDetails id={id} />
        <Text
          size={SizeText.L}
          className={styles.commentTitle}
          title={t('Recommend')}
        />
        <ArticleList
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          className={styles.recommendations}
          target="_blank"
        />
        <Text className={styles.commentTitle} title={t('Comments')} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList
          isLoading={commentsIsLoading}
          comments={comments}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
