import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { SizeText, Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import styles from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Array<Article>;
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.CARDS ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton
        className={styles.card}
        key={index}
        view={view}
      />
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
      <div
        className={classNames(styles.ArticleList, {}, [
          className,
          styles[view],
        ])}
      >
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text size="l" title={t('Articles not found')} />}
          off={
            <TextDeprecated size={SizeText.L} title={t('Articles not found')} />
          }
        />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <HStack
          wrap="wrap"
          gap="16"
          className={classNames(styles.ArticleListRedesigned, {}, [])}
          data-testid="ArticleList"
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
        </HStack>
      }
      off={
        <div
          className={classNames(styles.ArticleList, {}, [
            className,
            styles[view],
          ])}
          data-testid="ArticleList"
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
      }
    />
  );
});
