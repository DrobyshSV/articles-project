import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { SizeText, Text } from '@/shared/ui/Text/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import styles from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Array<Article>,
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.CARDS ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={styles.card} key={index} view={view} />
  ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.CARDS,
    isLoading,
    target,
  } = props;

  const { t } = useTranslation();

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
        <Text size={SizeText.L} title={t('Articles not found')} />
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.ArticleList, {}, [className, styles[view]])}
    >
      {articles.map((item) => (
        <ArticleListItem
          article={item}
          view={view}
          target={target}
          key={item.id}
          className={styles.card}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
