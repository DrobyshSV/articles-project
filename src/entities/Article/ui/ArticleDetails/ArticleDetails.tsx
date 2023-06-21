import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import EyeIcon from '@/shared/assets/icons/eye-icon.svg';
import { useAppDispatch } from '@/shared/config/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import {
  Text as TextDeprecated,
  AlignText,
  SizeText,
} from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton';
import { renderArticleBlock } from './renderArticleBlock';

import styles from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};
const ContentDeprecated = () => {
  const article = useSelector(getArticleDetailsData);
  return (
    <>
      <HStack justify="center" max>
        <Avatar size={200} src={article?.img} className={styles.avatar} />
      </HStack>
      <VStack data-testid="ArticleDetails.Info" gap="4" max>
        <TextDeprecated
          title={article?.title}
          text={article?.subtitle}
          size={SizeText.L}
        />
        <HStack gap="8">
          <Icon Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack gap="8">
          <Icon Svg={CalendarIcon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const ContentRedesign = () => {
  const article = useSelector(getArticleDetailsData);
  return (
    <>
      <Text title={article?.title} size="l" bold />
      <Text title={article?.subtitle} />
      <AppImage
        fallback={<Skeleton />}
        src={article?.img}
        className={styles.img}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Text align="center" title={t('Some error')} />}
        off={
          <TextDeprecated align={AlignText.CENTER} title={t('Some error')} />
        }
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ContentRedesign />}
        off={<ContentDeprecated />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        gap="16"
        max
        className={classNames(styles.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
